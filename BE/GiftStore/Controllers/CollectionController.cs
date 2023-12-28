using Autofac;
using GiftStore.DAL.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GiftStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionController : ControllerBase
    {
        private readonly ICollectionService _collectionService;
        private readonly ILifetimeScope _scope;

        public CollectionController(ICollectionService collectionService, ILifetimeScope scope)
        {
            _scope = scope;
            _collectionService = _scope.Resolve<ICollectionService>();
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetCollectionAll()
        {
            var result = await _collectionService.GetAllAsync();
            return Ok(result);
        }

    }
}
