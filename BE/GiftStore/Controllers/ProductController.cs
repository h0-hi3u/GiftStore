using Autofac;
using GiftStore.DAL.Contracts;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace GiftStore.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ILifetimeScope _scope;

    public ProductController(ILifetimeScope scope)
    {
        _scope = scope;
        _productService = _scope.Resolve<IProductService>();
    }

    #region Feature for user

    [HttpGet("paging")]
    public async Task<IActionResult> GetProductForUser(int pageSize, int pageIndex, int sortOption)
    {
        var result = await _productService.GetProductAll(pageSize, pageIndex, sortOption);
        return Ok(result);
    }

    #endregion

    #region Feature for admin

    [HttpGet]
    public async Task<IActionResult> GetAll() {
        var actionResult = await _productService.GetAllAsync();
        return Ok(actionResult);
    }
   
    [HttpGet("{id}")]
    public async Task<IActionResult> GetDetails([Required]string id)
    {
        var result = await _productService.GetDetail(id);
        return Ok(result);
    }
    #endregion
}
