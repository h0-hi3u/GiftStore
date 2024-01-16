using GiftStore.Core.Common;

namespace GiftStore.DAL.Contracts;

public interface IOrderService
{
    Task<AppActionResult> GetOrdersOfUser(string email);
    Task<AppActionResult> CreateOrderForUser(string email);
    Task<AppActionResult> CreateOrderForGuest();
    Task<AppActionResult> GetDetailAsync(string id);
}
