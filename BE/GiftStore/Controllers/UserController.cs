using Autofac;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.User;
using Microsoft.AspNetCore.Mvc;

namespace GiftStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILifetimeScope _scope;
        private readonly IUserService _userService;

        public UserController(ILifetimeScope scope)
        {
            _scope = scope;
            _userService = scope.Resolve<IUserService>();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterRequestDto userRegisterRequestDto)
        {
            var result = await _userService.RegisterAsync(userRegisterRequestDto);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginRequestDto userLoginRequestDto)
        {
            var result = await _userService.LoginAsync(userLoginRequestDto);
            return Ok(result);
        }
        [HttpGet("check-email")]
        public async Task<IActionResult> CheckEmailExist(string email = "")
        {
            var result = await _userService.CheckEmailExist(email);
            return Ok(result);
        }
        [HttpGet("check-phone")]
        public async Task<IActionResult> CheckPhoneExist(string phone = "")
        {
            var result = await _userService.CheckPhoneNumberExist(phone);
            return Ok(result);
        }
    }
}
