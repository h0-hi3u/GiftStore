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

    [HttpGet("new")]
    public async Task<IActionResult> GetProductNew()
    {
        var result = await _productService.GetProductNew();
        return Ok(result);
    }
    [HttpGet("search")]
    public async Task<IActionResult> SearchProduct(string? searchText, int pageSize, int pageIndex)
    {
        var result = await _productService.GetProductBySearch(searchText, pageSize, pageIndex);
        return Ok(result);
    }
    [HttpGet("detail/{id}")]
    public async Task<IActionResult> GetDetail(string id)
    {
        var result = await _productService.GetDetail(id);
        return Ok(result);
    }
    [HttpGet("detailCart/{id}")]
    public async Task<IActionResult> GetDetailCart(string id)
    {
        var result = await _productService.GetDetailCart(id);
        return Ok(result);
    }
    [HttpGet("all")]
    public async Task<IActionResult> GetProductAll(int pageSize, int pageIndex, int sortOption)
    {
        var result = await _productService.GetProductAll(pageSize, pageIndex, sortOption);
        return Ok(result);
    }
    [HttpGet("tag")]
    public async Task<IActionResult> GetProductWithTag(string id, int pageSize, int pageIndex, int sortOption)
    {
        var result = await _productService.GetProductByTag(id, pageSize, pageIndex, sortOption);
        return Ok(result);
    }
    [HttpGet("collection")]
    public async Task<IActionResult> GetProductWithCollection(string id, int pageSize, int pageIndex, int sortOption)
    {
        var result = await _productService.GetProductByCollection(id, pageSize, pageIndex, sortOption);
        return Ok(result);
    }
    [HttpGet("category")]
    public async Task<IActionResult> GetProductWithCategory(string id, int pageSize, int pageIndex, int sortOption)
    {
        var result = await _productService.GetProductByCategory(id, pageSize, pageIndex, sortOption);
        return Ok(result);
    }
    [HttpGet("relative")]
    public async Task<IActionResult> GetProductRelative(string id, int pageSize)
    {
        var result = await _productService.GetProductRelative(id, pageSize);
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
