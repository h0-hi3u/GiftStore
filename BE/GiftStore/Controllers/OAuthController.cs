using Autofac;
using GiftStore.DAL.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GiftStore.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OAuthController : ControllerBase
{
    private readonly ILifetimeScope _scope;
    private readonly IOAuthService _oAuthService;

    public OAuthController(ILifetimeScope scope)
    {
        _scope = scope;
        _oAuthService = _scope.Resolve<IOAuthService>();
    }
    [HttpGet("login-google")]
    public async Task<IActionResult> LoginWithGoogleAsync(string code)
    {
        var result = await _oAuthService.OAuthWithGoogleAsync(code);
        return Ok(result);
    }
}
