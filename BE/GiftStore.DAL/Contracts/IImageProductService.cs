using GiftStore.Core.Common;
using GiftStore.DAL.Model.Dto.ImageProduct;

namespace GiftStore.DAL.Contracts;

public interface IImageProductService
{
    Task<AppActionResult> GetAllAsync();
    Task<AppActionResult> GetDetailAsync(string id);
    Task<AppActionResult> CreateAsync(ImageProductCreateRequestDto imageProductCreateRequestDto);
    Task<AppActionResult> UpdateAsync(ImageProductUpdateRequestDto imageProductUpdateRequestDto);
    Task<AppActionResult> DeleteAsync(string id);
}
