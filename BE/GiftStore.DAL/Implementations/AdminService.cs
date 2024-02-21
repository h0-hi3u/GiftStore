using Autofac;
using AutoMapper;
using GiftStore.Core.Common;
using GiftStore.Core.Constants;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Constants;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.Admin;
using GiftStore.DAL.Model.Dto.BestSeller;
using GiftStore.DAL.Model.Dto.Product;
using GiftStore.DAL.Model.Entity;
using Microsoft.EntityFrameworkCore;

namespace GiftStore.DAL.Implementations;

public class AdminService : GenericService, IAdminService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<Order> _orderRepo;
    private readonly IRepository<Product> _productRepo;
    private readonly IRepository<BestSeller> _bestSellerRepo;
    private readonly IRepository<ImageProduct> _imageProductRepo;
    private readonly IMapper _mapper;
    public AdminService(ILifetimeScope scope, IMapper mapper) : base(scope)
    {
        _unitOfWork = Resolve<IUnitOfWork>();
        _orderRepo = _unitOfWork.Repository<Order>();
        _productRepo = _unitOfWork.Repository<Product>();
        _bestSellerRepo = _unitOfWork.Repository<BestSeller>();
        _imageProductRepo = _unitOfWork.Repository<ImageProduct>();
        _mapper = mapper;
    }

    public async Task<AppActionResult> AddChildProduct(ChildProductCreateRequestDto childProductDto)
    {
        var actionResult = new AppActionResult();
        var listImage = new List<ImageProduct>();
        try
        {
            var parent = await _productRepo.GetAsync(childProductDto.ParentId);
            if (parent == null)
            {
                return actionResult.BuildError(MessageConstants.ERR_ADD_FAIL);
            }
            var product = _mapper.Map<Product>(childProductDto);
            product.Name = parent.Name;
            product.IsParent = false;
            product.CategoryId = parent.CategoryId;
            product.SupplierId = parent.SupplierId;
            product.IsDeleted = parent.IsDeleted;
            product.ImageProduct = new List<ImageProduct>();
            await _productRepo.AddAsync(product);
            foreach (var item in childProductDto.ImageProduct)
            {
                var image = _mapper.Map<ImageProduct>(item);
                image.ProductId = product.Id;
                listImage.Add(image);
            }
            await _imageProductRepo.AddRangeAsync(listImage);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_ADD_SUCCESS);
        } catch (Exception ex)
        {
            var a = ex.Message;
            return actionResult.BuildError(MessageConstants.ERR_ADD_FAIL);
        }
    }

    public async Task<AppActionResult> AddFullProduct(FullProductCreateRequestDto fullProductDto)
    {
        var actionResult = new AppActionResult();
        try
        {
            //add parent
            var listImageParent = new List<ImageProduct>();
            var parentProduct = _mapper.Map<Product>(fullProductDto);
            parentProduct.IsParent = true;
            parentProduct.IsDeleted = false;
            parentProduct.ImageProduct = new List<ImageProduct>();
            await _productRepo.AddAsync(parentProduct);
            foreach (var item in fullProductDto.ImageProduct)
            {
                var image = _mapper.Map<ImageProduct>(item);
                image.ProductId = parentProduct.Id;
                listImageParent.Add(image);
            }
            await _imageProductRepo.AddRangeAsync(listImageParent);
            // add child
            foreach(var item in fullProductDto.ChildrenProduct)
            {
                var listImage = new List<ImageProduct>();
                item.ParentId = parentProduct.Id;
                var childProduct = _mapper.Map<Product>(item);
                childProduct.Name = parentProduct.Name;
                childProduct.IsParent = false;
                childProduct.CategoryId = parentProduct.CategoryId;
                childProduct.SupplierId = parentProduct.SupplierId;
                childProduct.IsDeleted = parentProduct.IsDeleted;
                childProduct.ImageProduct = new List<ImageProduct>();
                await _productRepo.AddAsync(childProduct);
                foreach (var img in item.ImageProduct)
                {
                    var image = _mapper.Map<ImageProduct>(img);
                    image.ProductId = childProduct.Id;
                    listImage.Add(image);
                }
                await _imageProductRepo.AddRangeAsync(listImage);
            }
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_ADD_SUCCESS);
        }
        catch (Exception ex)
        {
            var a = ex.Message;
            return actionResult.BuildError(MessageConstants.ERR_ADD_FAIL);
        }
    }

    public async Task<AppActionResult> AddParentProduct(ParentProductCreateRequestDto parentProductDto)
    {
        var actionResult = new AppActionResult();
        var listImage = new List<ImageProduct>();
        try
        {
            var product = _mapper.Map<Product>(parentProductDto);
            product.IsParent = true;
            product.IsDeleted = false;
            product.ImageProduct = new List<ImageProduct>();
            await _productRepo.AddAsync(product);
            foreach (var item in parentProductDto.ImageProduct)
            {
                var image = _mapper.Map<ImageProduct>(item);
                image.ProductId = product.Id;
                listImage.Add(image);
            }
            await _imageProductRepo.AddRangeAsync(listImage);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_ADD_SUCCESS);
        } catch
        {
            return actionResult.BuildError(MessageConstants.ERR_ADD_FAIL);
        }
    }

    public async Task<AppActionResult> GetBestSeller()
    {
        var actionResult = new AppActionResult();
        var result = await _bestSellerRepo.Entities().Include(bs => bs.Product).Include(bs => bs.Product.ImageProduct).OrderByDescending(bs => bs.NumberSold).ToListAsync();
        var data = _mapper.Map<IEnumerable<BestSellerShowResponseDto>>(result);
        return actionResult.BuildResult(data);
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

    public async Task<AppActionResult> GetAllParent()
    {
        var actionResult = new AppActionResult();
        var listParent = await _productRepo.Entities().Include(p => p.ImageProduct).Where(p => p.IsParent).ToListAsync();
        var result = _mapper.Map<IEnumerable<ProductShowResponseDto>>(listParent);
        return actionResult.BuildResult(result);
    }

    public async Task<AppActionResult> GetFullProduct(string id)
    {
        var actionResult = new AppActionResult();
        if (!Guid.TryParse(id, out Guid productId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }
        var productParent = await _productRepo.Entities().Include(p => p.ImageProduct).Include(p => p.Supplier).Include(p => p.Category).SingleOrDefaultAsync(p => p.IsParent && p.Id == productId);
        if (productParent == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        List<FullProductShowResponseDto> data = new List<FullProductShowResponseDto>();
        var idFind = productParent.Id;
        List<Product> listChildren = await _productRepo.Entities().Include(p => p.ImageProduct).Where(p => p.ParentId == idFind).ToListAsync();
        IEnumerable<ProductShowResponseDto> temp = _mapper.Map<IEnumerable<ProductShowResponseDto>>(listChildren);
        var product = _mapper.Map<FullProductShowResponseDto>(productParent);
        product.Children = (ICollection<ProductShowResponseDto>)temp;
        data.Add(product);
        return actionResult.BuildResult(data);
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
