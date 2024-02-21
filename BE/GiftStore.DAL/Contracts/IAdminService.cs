using GiftStore.Core.Common;
using GiftStore.DAL.Model.Dto.Product;

namespace GiftStore.DAL.Contracts;

public interface IAdminService
{
    Task<AppActionResult> GetDataReportOrderInMonth();
    Task<AppActionResult> GetDataReportOrderInYear();
    Task<AppActionResult> GetMonthlySales();
    Task<AppActionResult> GetMonthlyOrders();
    Task<AppActionResult> GetBestSeller();
    Task<AppActionResult> AddParentProduct(ParentProductCreateRequestDto parentProductDto);
    Task<AppActionResult> AddChildProduct(ChildProductCreateRequestDto childProductDto);
    Task<AppActionResult> AddFullProduct(FullProductCreateRequestDto fullProductDto);
    Task<AppActionResult> GetFullProduct(string id);
    Task<AppActionResult> GetAllParent();
}
