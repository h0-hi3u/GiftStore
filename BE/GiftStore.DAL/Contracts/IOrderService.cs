using GiftStore.Core.Common;
using GiftStore.DAL.Model.Dto.Order;

namespace GiftStore.DAL.Contracts;

public interface IOrderService
{
    Task<AppActionResult> GetOrdersOfUser(string email);
    Task<AppActionResult> CreateOrder(OrderCreateRequestDto orderCreateRequestDto);
    Task<AppActionResult> CreateOrderForGuest(OrderCreateRequestDto orderCreateRequestDto);
    Task<AppActionResult> GetDetailAsync(string id);
}
