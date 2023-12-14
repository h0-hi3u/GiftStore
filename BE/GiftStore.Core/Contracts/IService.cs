using GiftStore.Core.Common;

namespace GiftStore.Core.Contracts;

public interface IService
{
    Task<AppActionResult> GetAllAsync();
    Task<AppActionResult> GetDetailAsync(string id);
    Task<AppActionResult> AddAsync(object DtoAdd);
    Task<AppActionResult> UpdateAsync(object DtoUpdate);
    Task<AppActionResult> DeleteAsync(string id);
}
