using GiftStore.Core.Common;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Model.Dto.Supplier;

namespace GiftStore.DAL.Contracts;

public interface ISupplierService
{
    Task<AppActionResult> GetAllAsync();
    Task<AppActionResult> GetDetailAsync(string id);
    Task<AppActionResult> AddAsync(SupplierCreateRequestDto dto);
    Task<AppActionResult> UpdateAsync(SupplierUpdateRequestDto dto);
    Task<AppActionResult> DeleteAsync(string id);
}
