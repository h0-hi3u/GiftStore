using Autofac;
using GiftStore.Core.Common;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Constants;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.Admin;
using GiftStore.DAL.Model.Entity;
using Microsoft.EntityFrameworkCore;

namespace GiftStore.DAL.Implementations;

public class AdminService : GenericService, IAdminService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<Order> _orderRepo;
    private readonly IRepository<Product> _productRepo;
    private readonly IRepository<BestSeller> _bestSellerRepo;
    public AdminService(ILifetimeScope scope) : base(scope)
    {
        _unitOfWork = Resolve<IUnitOfWork>();
        _orderRepo = _unitOfWork.Repository<Order>();
        _productRepo = _unitOfWork.Repository<Product>();
        _bestSellerRepo = _unitOfWork.Repository<BestSeller>();
    }

    public async Task<AppActionResult> GetBestSeller()
    {
        var actionResult = new AppActionResult();
        var result = await _bestSellerRepo.Entities().Include(bs => bs.Product).Include(bs => bs.Product.ImageProduct).ToListAsync();
        return actionResult.BuildResult(result);
    }

    public async Task<AppActionResult> GetDataReportOrderInMonth()
    {
        var actionResult = new AppActionResult();
        DateTime currentDate = DateTime.Now.Date;
        var listAll = await _orderRepo.Entities().Where(o => o.TimeCreate >= currentDate.AddMonths(-1)).ToListAsync();
        int totalOrder = listAll.Count();

        List<DataPoint> dataPoints = new List<DataPoint>();
        int totalOrderPending = listAll.Where(o => o.OrderStatus == OrderConstants.ORDER_STATUS_SPENDING).Count();
        DataPoint pending = new DataPoint();
        pending.Name = "Pending";
        pending.Y = (double)totalOrderPending / totalOrder * 100;
        dataPoints.Add(pending);

        int totalOrderCancel = listAll.Where(o => o.OrderStatus == OrderConstants.ORDER_STATUS_CANCEL).Count();
        DataPoint cancel = new DataPoint();
        cancel.Name = "Cancel";
        cancel.Y = (double)totalOrderCancel / totalOrder * 100;
        dataPoints.Add(cancel);

        int totalOrderApprove = listAll.Where(o => o.OrderStatus == OrderConstants.ORDER_STATUS_APPROVED).Count();
        DataPoint approve = new DataPoint();
        approve.Name = "Approve";
        approve.Y = (double)totalOrderApprove / totalOrder * 100;
        dataPoints.Add(approve);

        int totalOrderShipping = listAll.Where(o => o.OrderStatus == OrderConstants.ORDER_STATUS_SHIPPING).Count();
        DataPoint shipping = new DataPoint();
        shipping.Name = "Shipping";
        shipping.Y = (double)totalOrderShipping / totalOrder * 100;
        dataPoints.Add(shipping);

        return actionResult.BuildResult(dataPoints);
    }

    public async Task<AppActionResult> GetDataReportOrderInYear()
    {
        var actionResult = new AppActionResult();
        var currentYear = DateTime.Now.Year;
        var ordersByMonth = await _orderRepo.Entities()
        .Where(o => o.TimeCreate.Value.Year == currentYear)
        .GroupBy(o => o.TimeCreate.Value.Month)
        .Select(g => new
        {
            x = g.Key,
            y = g.Count()
        })
        .OrderBy(g => g.x)
        .ToListAsync();
        return actionResult.BuildResult(ordersByMonth);
    }

    public async Task<AppActionResult> GetMonthlyOrders()
    {
        var actionResult = new AppActionResult();
        var currentMonth = DateTime.Now.Month;
        var totalOrders = await _orderRepo.Entities().Where(o => o.TimeCreate.Value.Month == currentMonth).CountAsync();
        return actionResult.BuildResult(totalOrders);
    }

    public async Task<AppActionResult> GetMonthlySales()
    {
        var actionResult = new AppActionResult();
        var currentMonth = DateTime.Now.Month;
        var totalSales = await _orderRepo.Entities().Where(o => o.TimeCreate.Value.Month == currentMonth).SumAsync(o => o.TotalPrice);
        return actionResult.BuildResult(totalSales);
    }
}
