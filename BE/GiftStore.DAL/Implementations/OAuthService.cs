using Autofac;
using AutoMapper;
using GiftStore.Core.Common;
using GiftStore.Core.Constants;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Constants;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.User;
using GiftStore.DAL.Model.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace GiftStore.DAL.Implementations;

public class OAuthService : GenericService, IOAuthService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<User> _userRepo;
    private readonly IMapper _mapper; 
    private readonly IConfiguration _configuration;
    private readonly Random _random = new Random();

    public OAuthService(IMapper mapper, ILifetimeScope scope) : base(scope)
    {
        _configuration = Resolve<IConfiguration>();
        _unitOfWork = Resolve<IUnitOfWork>();
        _userRepo = _unitOfWork.Repository<User>();
        _mapper = mapper;

    } 
    public async Task<AppActionResult> OAuthWithGoogleAsync(string code)
    {
        var actionResult = new AppActionResult();
        //var googleSettings = _configuration["GoogleSettings"];
        var client = new HttpClient();
        var requestParams = new Dictionary<string, string>()
        {
            {GoogleAuthConstants.CODE, WebUtility.UrlDecode(code)},
            {GoogleAuthConstants.CLIENT_ID, "356858350916-9eeqtpqmjncsp5mmco6o2dga67018u3n.apps.googleusercontent.com" },
            {GoogleAuthConstants.CLIENT_SECRET,  "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"},
            {GoogleAuthConstants.REDIRECT_URI,  "http://localhost:4200/login-google"},
            {GoogleAuthConstants.GRANT_TYPE, GoogleAuthConstants.AUTHORIZATION_CODE }
        };

        var content = new FormUrlEncodedContent(requestParams);
        var response = await client.PostAsync(GoogleAuthConstants.GOOGLE_TOKEN_URL, content);

        if(!response.IsSuccessStatusCode)
        {
            return actionResult.BuildError("Error response from google");
        }

        var authObject = JsonConvert.DeserializeObject<GoogleAuthResponse>(await response.Content.ReadAsStringAsync());
        if(authObject?.IdToken == null) 
        {
            return actionResult.BuildError("Can't get id token from google");
        }

        var handler = new JwtSecurityTokenHandler();
        var securityToken = handler.ReadJwtToken(authObject.IdToken);
        securityToken.Claims.TryGetValue(GoogleTokenClaimConstants.EMAIL, out var email);
        securityToken.Claims.TryGetValue(GoogleTokenClaimConstants.EMAIL_VERIFIED, out var emailVerified);
        securityToken.Claims.TryGetValue(GoogleTokenClaimConstants.GIVEN_NAME, out var firstName);
        securityToken.Claims.TryGetValue(GoogleTokenClaimConstants.FAMILY_NAME, out var lastName);
        securityToken.Claims.TryGetValue(GoogleTokenClaimConstants.PICTURE, out var picture);

        var user = await _userRepo.Entities().SingleOrDefaultAsync(u => u.Email == email);
        if (user != null) 
        {
            var token = "User existing and return token";
            return actionResult.BuildResult(token);
        }

        try
        {
            string password = GenerateAutoPassword(5);
            var sended = SendMail(password, email);
            if (!sended)
            {
                return actionResult.BuildError("Can't send Mail");
            }
            string hashPassword = BCrypt.Net.BCrypt.HashPassword(password);
            var userRegisterDto = CreateDefalutAccount(firstName, lastName, email, hashPassword);
            var userNew = _mapper.Map<User>(userRegisterDto);
            userNew.VIP = VIPConstants.VIP_0;
            await _userRepo.AddAsync(userNew);
            await _unitOfWork.Commit();
            return actionResult.BuildResult("Check mail and login with password in mail");
        } catch
        {
            return actionResult.BuildError("Can't add user");
        }
    }
    private bool SendMail(string password, string toMailAddress)
    {
        try
        {
            //MailMessage message = new MailMessage();
            //SmtpClient smtp = new SmtpClient();
            //message.From = new MailAddress("giftstore.hohieu@gmail.com");
            //message.To.Add(new MailAddress(toMailAddress));
            //message.Subject = "Password for GiftStore accout";
            //message.Body = "<h1>" + password + "</h1>";
            //message.IsBodyHtml = true;
            //smtp.Port = 587;
            //smtp.Host = "smtp.gmail.com"; //for gmail host
            //smtp.EnableSsl = true;
            //smtp.UseDefaultCredentials = false;
            //smtp.Credentials = new NetworkCredential("giftstore.hohieu@gmail.com", "pvft pdsa flwb jxuq");
            //smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            //smtp.Send(message);
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new NetworkCredential("giftstore.hohieu@gmail.com", "pvft pdsa flwb jxuq"),
                EnableSsl = true,
            };
            var mailMessage = new MailMessage
            {
                From = new MailAddress("giftstore.hohieu@gmail.com"),
                Subject = "Password for GiftStore accout",
                Body = "<h1>" + password + "</h1>",
                IsBodyHtml = true,
            };
            mailMessage.To.Add(toMailAddress);
            if (smtpClient != null)
                smtpClient.Send(mailMessage);
            return true;
        } catch (Exception ex)
        {
            var a = ex.Message;
            return false;
        }
    }
    private UserRegisterRequestDto CreateDefalutAccount(string firstName, string lastName, string email, string password)
    {
        UserRegisterRequestDto userRegisterRequestDto = new UserRegisterRequestDto();
        userRegisterRequestDto.FirstName = firstName;
        userRegisterRequestDto.LastName = lastName;
        userRegisterRequestDto.Email = email;
        userRegisterRequestDto.Password = password;
        return userRegisterRequestDto;
    }
    private string GenerateAutoPassword(int size, bool lowerCase = false)
    {
        var passwordBuilder = new StringBuilder();

        // Size-Letters lower case
        passwordBuilder.Append(RandomString(size, true));

        // 4-Digits between 1000 and 9999
        passwordBuilder.Append(RandomNumber(1000, 9999));

        // 2-Letters upper case
        passwordBuilder.Append(RandomString(size));
        return passwordBuilder.ToString();

    }
    public int RandomNumber(int min, int max)
    {
        return _random.Next(min, max);
    }
    public string RandomString(int size, bool lowerCase = false)
    {
        var builder = new StringBuilder(size);

        // Unicode/ASCII Letters are divided into two blocks
        // (Letters 65–90 / 97–122):
        // The first group containing the uppercase letters and
        // the second group containing the lowercase.

        // char is a single Unicode character
        char offset = lowerCase ? 'a' : 'A';
        const int lettersOffset = 26; // A...Z or a..z: length=26

        for (var i = 0; i < size; i++)
        {
            var @char = (char)_random.Next(offset, offset + lettersOffset);
            builder.Append(@char);
        }

        return lowerCase ? builder.ToString().ToLower() : builder.ToString();
    }
}
