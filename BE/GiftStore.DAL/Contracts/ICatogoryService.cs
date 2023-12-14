using GiftStore.Core.Common;
using GiftStore.DAL.Model.Dto.Category;

namespace GiftStore.DAL.Contracts;

public interface ICatogoryService
{
    Task<AppActionResult> GetAllAsync();
    Task<AppActionResult> GetDetailAsync(string id);
    Task<AppActionResult> CreateAsync(CategoryCreateRequestDto categoryCreateRequestDto);
    Task<AppActionResult> UpdateAsync(CategoryUpdateRequestDto categoryUpdateRequestDto);
    Task<AppActionResult> DeleteAsync(string id);
}
