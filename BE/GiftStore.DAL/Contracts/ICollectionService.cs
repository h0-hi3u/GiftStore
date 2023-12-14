using GiftStore.Core.Common;
using GiftStore.DAL.Model.Dto.Collection;

namespace GiftStore.DAL.Contracts;

public interface ICollectionService
{
    Task<AppActionResult> GetAllAsync();
    Task<AppActionResult> GetDetailAsync(string id);
    Task<AppActionResult> CreateAsync(CollectionCreateRequestDto collectionCreateRequestDto);
    Task<AppActionResult> UpdateAsync(CollectionUpdateRequestDto collectionUpdateRequestDto);
    Task<AppActionResult> DeleteAsync(string id);
}
