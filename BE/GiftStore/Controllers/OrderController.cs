using Autofac;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.Order;
using Microsoft.AspNetCore.Mvc;

namespace GiftStore.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly ILifetimeScope _scope;
    private readonly IOrderService _orderService;

    public OrderController(ILifetimeScope scope)
    {
        _scope = scope;
        _orderService = _scope.Resolve<IOrderService>();
    }
    [HttpGet("{email}")]
    public async Task<IActionResult> GetOrderOfUser(string email)
    {
        var result = await _orderService.GetOrdersOfUser(email);
        return Ok(result);
    }
    [HttpGet("detail/{id}")]
    public async Task<IActionResult> GetDetailOrder(string id)
    {
        var result = await _orderService.GetDetailAsync(id);
        return Ok(result);
    }
    [HttpPost("create-user")]
    public async Task<IActionResult> CreateOrderForUser(OrderCreateRequestDto orderCreateRequestDto)
    {
        var result = await _orderService.CreateOrderForUser(orderCreateRequestDto);
        return Ok(result);
    }
}
