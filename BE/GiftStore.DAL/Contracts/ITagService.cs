using GiftStore.Core.Common;
using GiftStore.DAL.Model.Dto.Tag;

namespace GiftStore.DAL.Contracts;

public interface ITagService
{
    Task<AppActionResult> GetAllAsync();
    Task<AppActionResult> GetDetailAsync(string id);
    Task<AppActionResult> AddAsync(TagCreateRequestDto tagCreateRequest);
    Task<AppActionResult> UpdateAsync(TagUpdateRequestDto tagUpdateRequest);
    Task<AppActionResult> DeleteAsync(string id);
}
