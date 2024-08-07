﻿using Autofac;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.Product;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GiftStore.Controllers;

[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
[ApiController]
public class AdminController : ControllerBase
{
    private readonly ILifetimeScope _scope;
    private readonly IAdminService _adminService;

    public AdminController(ILifetimeScope scope)
    {
        _scope = scope;
        _adminService = _scope.Resolve<IAdminService>();
    }
    [HttpGet("report-order-month")]
    public async Task<IActionResult> GetReportOrderInMonth()
    {
        var result = await _adminService.GetDataReportOrderInMonth();
        return Ok(result);
    }
    [HttpGet("report-order-year")]
    public async Task<IActionResult> GetReportOrderInYear()
    {
        var result = await _adminService.GetDataReportOrderInYear();
        return Ok(result);
    }
    [HttpGet("monthly-sales")]
    public async Task<IActionResult> GetMonthlySales()
    {
        var result = await _adminService.GetMonthlySales();
        return Ok(result);
    }
    [HttpGet("monthly-orders")]
    public async Task<IActionResult> GetMonthlyOrders()
    {
        var result = await _adminService.GetMonthlyOrders();
        return Ok(result);
    }
    [HttpGet("best-seller")]
    public async Task<IActionResult> GetBestSeller() 
    {
        var result = await _adminService.GetBestSeller();
        return Ok(result);
    }
    [HttpPost("add-parent-product")]
    public async Task<IActionResult> AddParentProduct(ParentProductCreateRequestDto parentProductDto)
    {
        var result = await _adminService.AddParentProduct(parentProductDto);
        return Ok(result);
    }
    [HttpPost("add-child-prodct")]
    public async Task<IActionResult> AddChildProduct(ChildProductCreateRequestDto childProductDto)
    {
        var result = await _adminService.AddChildProduct(childProductDto);
        return Ok(result);
    }
    [HttpPost("add-full-product")]
    public async Task<IActionResult> AddFullProduct(FullProductCreateRequestDto fullProductDto)
    {
        var result = await _adminService.AddFullProduct(fullProductDto);
        return Ok(result);
    }

    [HttpGet("all-info-product/{id}")]
    public async Task<IActionResult> GetAllProduct(string id)
    {
        var result = await _adminService.GetFullProduct(id);
        return Ok(result);
    }
    [HttpGet("all-parent")]
    public async Task<IActionResult> GetAllParent()
    {
        var result = await _adminService.GetAllParent();
        return Ok(result);
    }
}
