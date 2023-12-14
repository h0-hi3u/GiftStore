using Autofac;
using AutoMapper;
using GiftStore.Core.Common;
using GiftStore.Core.Constants;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.ImageProduct;
using GiftStore.DAL.Model.Entity;

namespace GiftStore.DAL.Implementations;

internal class ImageProductService : GenericService, IImageProductService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<ImageProduct> _imageProductRepo;
    private readonly IMapper _mapper;
    public ImageProductService(ILifetimeScope scope, IMapper mapper) : base(scope)
    {
        _unitOfWork = Resolve<IUnitOfWork>();
        _imageProductRepo = _unitOfWork.Repository<ImageProduct>();
        _mapper = mapper;

    }

    public async Task<AppActionResult> GetAllAsync()
    {
        var actionResult = new AppActionResult();
        var list = await _imageProductRepo.GetAllAsync();
        var result = _mapper.Map<IEnumerable<ImageProductShowResponseDto>>(list);
        return actionResult.BuildResult(result);
    }

    public async Task<AppActionResult> GetDetailAsync(string id)
    {
        var actionResult = new AppActionResult();
        if(!Guid.TryParse(id, out Guid imageProductId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }

        var existing = await _imageProductRepo.GetAsync(imageProductId);
        if(existing == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }

        var result = _mapper.Map<ImageProductShowResponseDto>(existing);
        return actionResult.BuildResult(result);
    }
    public async Task<AppActionResult> CreateAsync(ImageProductCreateRequestDto imageProductCreateRequestDto)
    {
        var actionResult = new AppActionResult();
        try
        {
            var imageProduct = _mapper.Map<ImageProduct>(imageProductCreateRequestDto);
            await _imageProductRepo.AddAsync(imageProduct);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_ADD_SUCCESS);
        } catch
        {
            return actionResult.BuildError(MessageConstants.ERR_ADD_FAIL);
        }
    }

    public async Task<AppActionResult> UpdateAsync(ImageProductUpdateRequestDto imageProductUpdateRequestDto)
    {
        var actionResult = new AppActionResult();

        var existing = await _imageProductRepo.GetAsync(imageProductUpdateRequestDto.Id);
        if(existing == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_UPDATE_FAIL);
        }

        try
        {
            var imageProduct = _mapper.Map<ImageProduct>(imageProductUpdateRequestDto);
            _imageProductRepo.Update(imageProduct);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_UPDATE_SUCCESS);
        } catch
        {
            return actionResult.BuildError(MessageConstants.ERR_UPDATE_FAIL);
        }
    }

    public async Task<AppActionResult> DeleteAsync(string id)
    {
        var actionResult = new AppActionResult();
        if(!Guid.TryParse(id, out Guid imageProductId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }

        var existing = await _imageProductRepo.GetAsync(imageProductId);
        if(existing == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }    

        try
        {
            await _imageProductRepo.DeleteAsync(imageProductId);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_DELETE_SUCCESS);
        } catch
        {
            return actionResult.BuildError(MessageConstants.ERR_DELETE_FAIL);
        }
    }
}
