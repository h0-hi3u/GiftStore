using GiftStore.Core.Common;
using GiftStore.DAL.Model.Dto.BestSeller;

namespace GiftStore.DAL.Contracts;

public interface IBestSellerService
{
    Task<AppActionResult> GetAllAsync();
    Task<AppActionResult> CrateAsync(BestSellerCreateRequestDto bestSellerCreateRequestDto);
    Task<AppActionResult> DeleteAsync(string id);

}
