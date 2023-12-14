using Autofac;
using AutoMapper;
using GiftStore.Core.Common;
using GiftStore.Core.Constants;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.Tag;
using GiftStore.DAL.Model.Entity;
using System.Data.Entity;

namespace GiftStore.DAL.Implementations;

public class TagService : GenericService, ITagService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<Tag> _tagRepo;
    private readonly IMapper _mapper;

    public TagService(ILifetimeScope scope, IMapper mapper) : base(scope)
    {
        _unitOfWork = _scope.Resolve<IUnitOfWork>();
        _tagRepo = _unitOfWork.Repository<Tag>();
        _mapper = mapper;
    }

    public async Task<AppActionResult> GetAllAsync()
    {
        var actionResult = new AppActionResult();
        IEnumerable<Tag> listTag = await _tagRepo.Entities().Where(t => t.IsDeleted == false).ToListAsync();
        IEnumerable<Tag> listActive = listTag.Where(t => t.IsDeleted == false);
        IEnumerable<TagShowResponseDto> result = _mapper.Map<IEnumerable<TagShowResponseDto>>(listActive);
        return actionResult.BuildResult(result);
    }

    public async Task<AppActionResult> GetDetailAsync(string id)
    {
        var actionResult = new AppActionResult();

        if (!Guid.TryParse(id, out Guid tagId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }

        var tag = await _tagRepo.GetAsync(tagId);

        if (tag == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        TagShowResponseDto result = _mapper.Map<TagShowResponseDto>(tag);
        return actionResult.BuildResult(result);
    }


    public async Task<AppActionResult> AddAsync(TagCreateRequestDto tagCreateRequestDto)
    {
        var actionResult = new AppActionResult();
        try
        {
            Tag tag = _mapper.Map<Tag>(tagCreateRequestDto);
            tag.IsDeleted = false;
            await _tagRepo.AddAsync(tag);
            await _unitOfWork.Commit();
        }
        catch
        {
            return actionResult.BuildError(MessageConstants.ERR_ADD_FAIL);
        }
        return actionResult.SetInfo(true, MessageConstants.MSG_ADD_SUCCESS);
    }

    public async Task<AppActionResult> UpdateAsync(TagUpdateRequestDto tagUpdateRequestDto)
    {
        var actionResult = new AppActionResult();
        var tag = await _tagRepo.GetAsync(tagUpdateRequestDto.Id);
        if(tag == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        try
        {
            tag.Id = tagUpdateRequestDto.Id;
            tag.Name = tagUpdateRequestDto.Name;
            tag.Description = tagUpdateRequestDto.Description;
            _tagRepo.Update(tag);
            await _unitOfWork.Commit();
        }
        catch
        {
            return actionResult.BuildError(MessageConstants.ERR_UPDATE_FAIL);
        }
        return actionResult.SetInfo(true, MessageConstants.MSG_UPDATE_SUCCESS);

    }
    public async Task<AppActionResult> DeleteAsync(string id)
    {
        var actionResult = new AppActionResult();
        if(!Guid.TryParse(id, out Guid tagId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }

        var tag = await _tagRepo.GetAsync(tagId);

        if(tag == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        tag.IsDeleted = true;
        _tagRepo.Update(tag);
        await _unitOfWork.Commit();
        return actionResult.SetInfo(true, MessageConstants.MSG_DELETE_SUCCESS);
    }
}
