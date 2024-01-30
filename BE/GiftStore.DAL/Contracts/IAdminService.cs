using GiftStore.Core.Common;

namespace GiftStore.DAL.Contracts;

public interface IAdminService
{
    Task<AppActionResult> GetDataReportOrderInMonth();
    Task<AppActionResult> GetDataReportOrderInYear();
    Task<AppActionResult> GetMonthlySales();
    Task<AppActionResult> GetMonthlyOrders();
}
