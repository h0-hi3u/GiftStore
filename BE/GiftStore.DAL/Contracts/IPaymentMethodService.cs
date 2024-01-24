using GiftStore.Core.Common;

namespace GiftStore.DAL.Contracts;

public interface IPaymentMethodService
{
    Task<AppActionResult> GetAllAsync();
}
