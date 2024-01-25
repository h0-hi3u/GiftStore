using Autofac;
using GiftStore.DAL.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GiftStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BestSellerController : ControllerBase
    {
        private readonly ILifetimeScope _scope;
        private readonly IBestSellerService _bestSellerService;

        public BestSellerController(ILifetimeScope scope)
        {
            _scope = scope;
            _bestSellerService = _scope.Resolve<IBestSellerService>();
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllAsync()
        {
            var result = await _bestSellerService.GetProductBestSeller();
            return Ok(result);
        }
    }
}
