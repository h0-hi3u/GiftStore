using Autofac;
using GiftStore.Core.Common;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GiftStore.DAL.Implementations
{
    public class OrderDetailService : GenericService, IOrderDetailService
    {
        IRepository<OrderDetail> _orderDeatilRepo;
        IUnitOfWork _unitOfWork;
        public OrderDetailService(ILifetimeScope scope) : base(scope)
        {
            _unitOfWork = Resolve<IUnitOfWork>();
            _orderDeatilRepo = _unitOfWork.Repository<OrderDetail>();
        }
    }
}
