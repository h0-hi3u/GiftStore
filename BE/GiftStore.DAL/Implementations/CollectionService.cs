using Autofac;
using AutoMapper;
using GiftStore.Core.Common;
using GiftStore.Core.Constants;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.Collection;
using GiftStore.DAL.Model.Entity;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace GiftStore.DAL.Implementations;

public class CollectionService : GenericService, ICollectionService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<Collection> _collectionRepo;
    private readonly IMapper _mapper;
    public CollectionService(ILifetimeScope scope, IMapper mapper) : base(scope)
    {
        _unitOfWork = Resolve<IUnitOfWork>();
        _collectionRepo = Resolve<IRepository<Collection>>();
        _mapper = mapper;
    }

    public async Task<AppActionResult> GetAllAsync()
    {
        var actionResult = new AppActionResult();
        var list = await _collectionRepo.Entities().Where(c => !c.IsDeleted).ToListAsync();
        var result = _mapper.Map<IEnumerable<CollectionShowResponseDto>>(list);
        return actionResult.BuildResult(result);
    }

    public async Task<AppActionResult> GetDetailAsync(string id)
    {
        var actionResult = new AppActionResult();
        if(!Guid.TryParse(id, out Guid collectionId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }
        var collection = await _collectionRepo.GetAsync(collectionId);
        if(collection == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        var result = _mapper.Map<CollectionShowResponseDto>(collection);
        return actionResult.BuildResult(result);
    }

    public async Task<AppActionResult> CreateAsync(CollectionCreateRequestDto collectionCreateRequestDto)
    {
        var actionResult = new AppActionResult();
        try
        {
            var collection = _mapper.Map<Collection>(collectionCreateRequestDto);
            await _collectionRepo.AddAsync(collection);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_ADD_SUCCESS);
        } catch
        {
            return actionResult.BuildError(MessageConstants.ERR_ADD_FAIL);
        }
    }

    public async Task<AppActionResult> UpdateAsync(CollectionUpdateRequestDto collectionUpdateRequestDto)
    {
        var actionResult = new AppActionResult();
        var collection = await _collectionRepo.GetAsync(collectionUpdateRequestDto.Id);
        if(collection == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }

        try
        {
            var result = _mapper.Map<Collection>(collectionUpdateRequestDto);
            _collectionRepo.Update(result);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_UPDATE_SUCCESS);
        }
        catch
        {
            return actionResult.BuildError(MessageConstants.ERR_UPDATE_FAIL);
        }
    }
    public async Task<AppActionResult> DeleteAsync(string id)
    {
        var actionResult = new AppActionResult();
        if(!Guid.TryParse(id, out Guid collectionId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }
        var collection = await _collectionRepo.GetAsync(collectionId);
        if(collection == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        try
        {
            collection.IsDeleted = true;
            _collectionRepo.Update(collection);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_DELETE_SUCCESS);
        } catch
        {
            return actionResult.BuildError(MessageConstants.ERR_DELETE_FAIL);
        }
    }
}
