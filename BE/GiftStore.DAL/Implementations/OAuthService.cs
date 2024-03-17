using Autofac;
using AutoMapper;
using GiftStore.Core.Common;
using GiftStore.Core.Constants;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
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
            {GoogleAuthConstants.REDIRECT_URI,  "http://localhost:4200/register"},
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
        securityToken.Claims.TryGetValue(GoogleTokenClaimConstants.NAME, out var name);
        securityToken.Claims.TryGetValue(GoogleTokenClaimConstants.PICTURE, out var picture);

        var user = await _userRepo.Entities().SingleOrDefaultAsync(u => u.Email == email);
        if (user != null) 
        {
            var token = "User existing and return token";
            return actionResult.BuildResult(token);
        }

        return actionResult.BuildResult("123");
    }
}
