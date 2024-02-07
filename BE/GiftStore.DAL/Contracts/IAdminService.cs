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
}
