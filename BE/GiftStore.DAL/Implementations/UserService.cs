using Autofac;
using AutoMapper;
using GiftStore.Core.Common;
using GiftStore.Core.Constants;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.User;
using GiftStore.DAL.Model.Entity;

namespace GiftStore.DAL.Implementations;

public class UserService : GenericService, IUserService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<User> _userRepo;
    private readonly IMapper _mapper;
    public UserService(ILifetimeScope scope, IMapper mapper) : base(scope)
    {
        _unitOfWork = Resolve<IUnitOfWork>();
        _userRepo = _unitOfWork.Repository<User>();
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

    public async Task<AppActionResult> CreateAsync(UserCreateRequestDto userCreateRequestDto)
    {
        var actionResult = new AppActionResult();

        try
        {
            var user = _mapper.Map<User>(userCreateRequestDto);
            user.VIP = VIPContants.VIP0;
            await _userRepo.AddAsync(user);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_ADD_SUCCESS);

        }
        catch
        {
            return actionResult.BuildError(MessageConstants.ERR_ADD_FAIL);
        }
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
}
