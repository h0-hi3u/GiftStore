using Autofac;
using AutoMapper;
using Azure.Core;
using GiftStore.Core.Common;
using GiftStore.Core.Constants;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Constants;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.User;
using GiftStore.DAL.Model.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GiftStore.DAL.Implementations;

public class UserService : GenericService, IUserService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<User> _userRepo;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;
    private readonly IRepository<Product> _productRepo;

    public UserService(ILifetimeScope scope, IMapper mapper) : base(scope)
    {
        _unitOfWork = Resolve<IUnitOfWork>();
        _configuration = Resolve<IConfiguration>();
        _userRepo = _unitOfWork.Repository<User>();
        _productRepo = _unitOfWork.Repository<Product>();
        _mapper = mapper;
    }

    public async Task<AppActionResult> GetAllAsync()
    {
        var actionResult = new AppActionResult();
        var list = await _userRepo.GetAllAsync();
        var result = _mapper.Map<IEnumerable<UserShowResponseDto>>(list);
        return actionResult.BuildResult(result);
    }

    public async Task<AppActionResult> GetDetailAsync(string id)
    {
        var actionResult = new AppActionResult();
        if (!Guid.TryParse(id, out Guid userId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }

        var user = await _userRepo.GetAsync(userId);
        if (user == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }

        var result = _mapper.Map<UserShowResponseDto>(user);
        return actionResult.BuildResult(result);
    }

    public async Task<AppActionResult> UpdateAsync(UserUpdateRequestDto userUpdateRequestDto)
    {
        var actionResult = new AppActionResult();

        var existing = await _userRepo.GetAsync(userUpdateRequestDto.Id);
        if (existing == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        try
        {
            var user = _mapper.Map<User>(userUpdateRequestDto);
            _userRepo.Update(user);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_UPDATE_SUCCESS);
        } catch
        {
            return actionResult.BuildError(MessageConstants.ERR_UPDATE_FAIL);
        }
    }

    public async Task<AppActionResult> DeleteAsync(string id)
    {
        var actionResult = new AppActionResult();
        if(!Guid.TryParse(id, out Guid userId))
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }

        var existing = await _userRepo.GetAsync(userId);
        if (existing == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }

        try
        {
            await _userRepo.DeleteAsync(existing.Id);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_DELETE_SUCCESS);
        } catch
        {
            return actionResult.BuildError(MessageConstants.ERR_DELETE_FAIL);
        }
    }

    public async Task<AppActionResult> LoginAsync(UserLoginRequestDto userLoginRequestDto)
    {
        var actionResult = new AppActionResult();
        var user = await _userRepo.Entities().SingleOrDefaultAsync(u => u.Email == userLoginRequestDto.Email);
        if (user == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_EXIST_EMAIL);
        }

        if (!BCrypt.Net.BCrypt.Verify(userLoginRequestDto.Password, user.Password))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_ACCOUNT);
        }
        string token = CreateToken(user);
        return actionResult.BuildResult(token);
    }
    private string CreateToken(User user)
    {
        string fullName = user.FirstName + " " + user.LastName;
        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, fullName),
            new Claim(ClaimTypes.Email, user.Email)
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration.GetSection("AppSettings:Token").Value!));

        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: cred
            );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        return jwt;
    }

    public async Task<AppActionResult> RegisterAsync(UserRegisterRequestDto userRegisterRequestDto)
    {
        var actionResult = new AppActionResult();
        var existingEmail = _userRepo.Entities().SingleOrDefault(u => u.Email == userRegisterRequestDto.Email);
        if (existingEmail != null)
        {
            return actionResult.BuildError(MessageConstants.ERR_EXIST_EMAIL);
        }
        try
        {
            var user = _mapper.Map<User>(userRegisterRequestDto);
            string hashPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Password = hashPassword;
            user.VIP = VIPConstants.VIP_0;
            await _userRepo.AddAsync(user);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_ADD_SUCCESS);
        }
        catch
        {
            return actionResult.BuildError(MessageConstants.ERR_ADD_FAIL);
        }
    }

    public async Task<AppActionResult> CheckEmailExist(string email)
    {
        var actionResult = new AppActionResult();
        var existing = await _userRepo.Entities().SingleOrDefaultAsync(u => u.Email == email);
        if (existing == null)
        {
            return actionResult.BuildResult(true);
        } else
        {
            return actionResult.BuildResult(false);
        }
    }

    public async Task<AppActionResult> ChangePasswordAsync(UserChangePasswordDto userChangePasswordDto)
    {
        var actionResult = new AppActionResult();

        var user = await _userRepo.Entities().SingleOrDefaultAsync(u => u.Email == userChangePasswordDto.Email);
        if (user == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_EXIST_EMAIL);
        }

        if (!BCrypt.Net.BCrypt.Verify(userChangePasswordDto.Password, user.Password))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_ACCOUNT);
        }

        try
        {
            string hashNewPassword = BCrypt.Net.BCrypt.HashPassword(userChangePasswordDto.NewPassword);
            user.Password = hashNewPassword;
            _userRepo.Update(user);
             await _unitOfWork.Commit();
            return actionResult.SetInfo(true);
        } catch (Exception ex)
        {
            return actionResult.BuildError(ex.Message);
        }
    }
}
