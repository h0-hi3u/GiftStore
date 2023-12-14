using Autofac;
using AutoMapper;
using GiftStore.Core.Common;
using GiftStore.Core.Constants;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.BestSeller;
using GiftStore.DAL.Model.Entity;

namespace GiftStore.DAL.Implementations;

public class BestSellerService : GenericService, IBestSellerService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<BestSeller> _bestSellerRepo;
    private readonly IMapper _mapper;

    public BestSellerService(ILifetimeScope scope, IMapper mapper) : base(scope)
    {
        _unitOfWork = Resolve<IUnitOfWork>();
        _bestSellerRepo = _unitOfWork.Repository<BestSeller>();
        _mapper = mapper;
    }

    public async Task<AppActionResult> GetAllAsync()
    {
        var actionResult = new AppActionResult();
        var list = await _bestSellerRepo.GetAllAsync();
        var resutl = _mapper.Map<IEnumerable<BestSellerShowResponseDto>>(list);
        return actionResult.BuildResult(resutl);
    }

    public async Task<AppActionResult> CrateAsync(BestSellerCreateRequestDto bestSellerCreateRequestDto)
    {
        var actionResult = new AppActionResult(); 
        try
        {
            var bestSeller = _mapper.Map<BestSeller>(bestSellerCreateRequestDto);
            await _bestSellerRepo.AddAsync(bestSeller);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_ADD_SUCCESS);
        } catch
        {
            return actionResult.BuildError(MessageConstants.ERR_ADD_FAIL);
        }
    }

    public async Task<AppActionResult> DeleteAsync(string id)
    {
        var actionResult = new AppActionResult();
        if(!Guid.TryParse(id, out Guid bestSellerId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }

        var bestSeller = await _bestSellerRepo.GetAsync(bestSellerId);
        if(bestSeller == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        try
        {
            _bestSellerRepo.Delete(bestSeller.Id);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_ADD_SUCCESS);
        } catch
        {
            return actionResult.BuildError(MessageConstants.ERR_DELETE_FAIL);
        }
    }


}
