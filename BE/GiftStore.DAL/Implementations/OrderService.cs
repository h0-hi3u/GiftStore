using Autofac;
using AutoMapper;
using GiftStore.Core.Common;
using GiftStore.Core.Constants;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Constants;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.Order;
using GiftStore.DAL.Model.Dto.OrderDetail;
using GiftStore.DAL.Model.Entity;
using Microsoft.EntityFrameworkCore;

namespace GiftStore.DAL.Implementations;

public class OrderService : GenericService, IOrderService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<Order> _orderRepo;
    private readonly IRepository<User> _userRepo;
    private readonly IRepository<OrderDetail> _orderDetailRepo;
    private readonly IRepository<Product> _productRepo;
    private readonly IMapper _mapper;
    public OrderService(ILifetimeScope scope, IMapper mapper) : base(scope)
    {
        _unitOfWork = Resolve<IUnitOfWork>();
        _orderRepo = _unitOfWork.Repository<Order>();
        _userRepo = _unitOfWork.Repository<User>();
        _orderDetailRepo = _unitOfWork.Repository<OrderDetail>();
        _productRepo = _unitOfWork.Repository<Product>();
        _mapper = mapper;
    }

    public async Task<AppActionResult> GetDetailAsync(string id)
    {
        var actionResult = new AppActionResult();
        if (!Guid.TryParse(id, out Guid orderId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }

        var orderDetails = await _orderDetailRepo.Entities().Include(od => od.Product).Include(od => od.Product.ImageProduct).Where(od => od.OrderId == orderId).ToListAsync();
        if (orderDetails == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        var result = _mapper.Map<IEnumerable<OrderDetailShowResponseDto>>(orderDetails);
        return actionResult.BuildResult(result);
    }

    public async Task<AppActionResult> GetOrdersOfUser(string email)
    {
        var actionResult = new AppActionResult();
        User user = await _userRepo.Entities().Include(u => u.Order).SingleOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_EXIST_EMAIL);
        }
        //List<Order> listOrder = await _orderRepo.Entities().Include(o => o.PaymentMethod).Where(o => o.UserId == user.Id).ToListAsync();
        var result = _mapper.Map<IEnumerable<OrderShowResponse>>(user.Order);
        return actionResult.BuildResult(result);

    }
    public async Task<AppActionResult> CreateOrderForUser(OrderCreateRequestDto orderCreateRequestDto)
    {
        var actionResult = new AppActionResult();
        string email = orderCreateRequestDto.Email;
        var user = await _userRepo.Entities().SingleOrDefaultAsync(o => o.Email == email);
        try
        {
            var order = _mapper.Map<Order>(orderCreateRequestDto);
            if (user != null)
            {
                order.UserId = user.Id;
            }
            else
            {
                order.UserId = null;
            }
            order.OrderStatus = OrderConstants.ORDER_STATUS_SPENDING;
            order.TotalPrice = 0;
            await _orderRepo.AddAsync(order);
            //await _unitOfWork.Commit();
            double totalPrice = 0;
            List<OrderDetail> listOD = new List<OrderDetail>();
            foreach (var od in orderCreateRequestDto.OrderDetails)
            {
                double a = (double)(od.Price * od.Quantity - (od.Price * od.Quantity * (od.Discount / 100)));
                totalPrice = totalPrice + a;
                var orderDetail = _mapper.Map<OrderDetail>(od);
                var product = await _productRepo.GetAsync(od.ProductId);
                orderDetail.OrderId = order.Id;
                orderDetail.ProductId = product.Id;
                orderDetail.Product = product;
                await _orderDetailRepo.AddAsync(orderDetail);
                //await _unitOfWork.Commit();
                listOD.Add(orderDetail);
            }
            _orderRepo.Update(order);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_ADD_SUCCESS);
        }
        catch (Exception ex)
        {
            return actionResult.BuildError(ex.Message);
        }
    }
    public Task<AppActionResult> CreateOrderForGuest(OrderCreateRequestDto orderCreateRequestDto)
    {
        throw new NotImplementedException();
    }

}
