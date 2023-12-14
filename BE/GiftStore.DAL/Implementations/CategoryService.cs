using Autofac;
using AutoMapper;
using GiftStore.Core.Common;
using GiftStore.Core.Constants;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.Category;
using GiftStore.DAL.Model.Entity;
using System.Data.Entity;
using System.Net.Http.Headers;

namespace GiftStore.DAL.Implementations;

public class CategoryService : GenericService, ICatogoryService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<Category> _categoryRepo;
    private readonly IMapper _mapper;

    public CategoryService(ILifetimeScope scope, IMapper mapper) : base(scope)
    {
        _unitOfWork = Resolve<IUnitOfWork>();
        _categoryRepo = Resolve<IRepository<Category>>();
        _mapper = mapper;
    }

    public async Task<AppActionResult> GetAllAsync()
    {
        var actionResult = new AppActionResult();
        var list = await _categoryRepo.Entities().Where(c => c.IsDeleted == false).ToListAsync();
        var result = _mapper.Map<IEnumerable<CategoryShowResponseDto>>(list);
        return actionResult.BuildResult(result);
    }

    public async Task<AppActionResult> GetDetailAsync(string id)
    {
        var actionResult = new AppActionResult();
        if(!Guid.TryParse(id, out Guid categoryId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }
        var category = await _categoryRepo.GetAsync(categoryId);
        if(category == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        var result = _mapper.Map<CategoryShowResponseDto>(category);
        return actionResult.BuildResult(result);
    }

    public async Task<AppActionResult> CreateAsync(CategoryCreateRequestDto categoryCreateRequestDto)
    {
        var actionResult = new AppActionResult();
        try
        {
            var category = _mapper.Map<Category>(categoryCreateRequestDto);
            category.IsDeleted = false;
            await _categoryRepo.AddAsync(category);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_ADD_SUCCESS);
        }
        catch
        {
            return actionResult.BuildError(MessageConstants.ERR_ADD_FAIL);
        }
        
    }

    public async Task<AppActionResult> UpdateAsync(CategoryUpdateRequestDto categoryUpdateRequestDto)
    {
        var actionResult = new AppActionResult();
        var category = await _categoryRepo.GetAsync(categoryUpdateRequestDto.Id);
        if (category == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        try
        {
            category.Id = categoryUpdateRequestDto.Id;
            category.Name = categoryUpdateRequestDto.Name;
            category.Description = categoryUpdateRequestDto.Description;
            category.TagId = categoryUpdateRequestDto.TagId;
            _categoryRepo.Update(category);
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
        if(!Guid.TryParse(id, out Guid categoryId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }
        var category = await _categoryRepo.GetAsync(categoryId);

        if (category == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        try
        {
            category.IsDeleted = true;
            _categoryRepo.Update(category);
            await _unitOfWork.Commit();
            return actionResult.BuildError(MessageConstants.MSG_DELETE_SUCCESS);
        } catch
        {
            return actionResult.BuildError(MessageConstants.ERR_DELETE_FAIL);
        }
    }
}
