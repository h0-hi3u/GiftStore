using Autofac;
using AutoMapper;
using GiftStore.DAL.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace GiftStore.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PaymentMethodController : ControllerBase
{
    private readonly IPaymentMethodService _paymentMethodService;
    private readonly ILifetimeScope _scope;
    public PaymentMethodController(ILifetimeScope scope)
    {
        _scope = scope;
        _paymentMethodService = _scope.Resolve<IPaymentMethodService>();
    }
    [HttpGet("all")]
    public async Task<IActionResult> GetAllAsync()
    {
        var result = await _paymentMethodService.GetAllAsync();
        return Ok(result);
    }
}
