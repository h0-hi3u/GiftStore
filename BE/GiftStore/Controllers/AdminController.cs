using Autofac;
using GiftStore.DAL.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace GiftStore.Controllers;

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
}
