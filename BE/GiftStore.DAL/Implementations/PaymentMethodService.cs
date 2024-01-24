using Autofac;
using AutoMapper;
using GiftStore.Core.Common;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.PaymentMethod;
using GiftStore.DAL.Model.Entity;

namespace GiftStore.DAL.Implementations;

public class PaymentMethodService : GenericService, IPaymentMethodService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<PaymentMethod> _paymentRepo;
    private readonly IMapper _mapper;
    public PaymentMethodService(ILifetimeScope scope, IMapper mapper) : base(scope)
    {
        _unitOfWork = Resolve<IUnitOfWork>();
        _paymentRepo = _unitOfWork.Repository<PaymentMethod>();
        _mapper = mapper;
    }

    public async Task<AppActionResult> GetAllAsync()
    {
        var actionResult = new AppActionResult();
        var list = await _paymentRepo.GetAllAsync();
        var result = _mapper.Map<IEnumerable<PaymentMethodShowResponseDto>>(list);
        return actionResult.BuildResult(result);
    }
}
