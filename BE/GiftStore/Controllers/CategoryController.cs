using Autofac;
using GiftStore.DAL.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace GiftStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ILifetimeScope _scope;
        private readonly ICategoryService _categoryService;
        public CategoryController(ILifetimeScope scope)
        {
            _scope = scope;
            _categoryService = _scope.Resolve<ICategoryService>();
        }

        [HttpGet("detail/{id}")]
        public async Task<IActionResult> GetCategoryDetail([Required] string id) {
            var result = await _categoryService.GetDetailAsync(id);
            return Ok(result);
        }
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllCategory()
        {
            var result = await _categoryService.GetAllAsync();
            return Ok(result);
        }
    }
}
