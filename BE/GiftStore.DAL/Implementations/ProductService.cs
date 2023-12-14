﻿using Autofac;
using GiftStore.Core.Common;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Constants;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Entity;
using System.Linq.Dynamic.Core;
using Microsoft.EntityFrameworkCore;
using GiftStore.Core.Helper;
using GiftStore.Core.Constants;
using GiftStore.DAL.Model.Dto;

namespace GiftStore.DAL.Implementations;

public class ProductService : GenericService, IProductService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<Product> _productRepo;
    private readonly IRepository<Collection> _collectionRepo;
    private readonly IRepository<Tag> _tagRepo;
    private readonly IRepository<BestSeller> _bestSellerRepo;

    public ProductService(ILifetimeScope scope) : base(scope)
    {
        _unitOfWork = Resolve<IUnitOfWork>();
        _productRepo = _unitOfWork.Repository<Product>();
        _collectionRepo = _unitOfWork.Repository<Collection>();
        _tagRepo = _unitOfWork.Repository<Tag>();
        _bestSellerRepo = _unitOfWork.Repository<BestSeller>();
    }

    public Task<AppActionResult> AddProduct()
    {
        throw new NotImplementedException();
    }

    public async Task<AppActionResult> GetAllAsync()
    {
        var actionResult = new AppActionResult();
        var result = await _productRepo.GetAllAsync();
        return actionResult.BuildResult(result);
    }

    public async Task<AppActionResult> GetDetail(string id)
    {
        var actionResult = new AppActionResult();
        if(!Guid.TryParse(id, out Guid productId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }
        Product product = await _productRepo.GetAsync(p => p.Id == productId);
        if(product == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        return actionResult.BuildResult(product);
    }

    public async Task<AppActionResult> GetProductBySearch(string searchText, int pageSize, int pageIndex, int sortOption)
    {
        var actionResult = new AppActionResult();
        PagingDto pagingDto = new PagingDto();

        if (sortOption < 0 || sortOption > (SortConstants.SortOptions.Length - 1))
        {
            return actionResult.BuildError("Invalid sort");
        }
        string sortString = SortConstants.SortOptions[sortOption];

        int skip = CalculateHelper.CalculatePaging(pageSize, pageIndex);
        var all = _productRepo.Entities()
            .Where(p => p.Name.Contains(searchText))
            .OrderBy(sortString);

        var totalRecords = await all.CountAsync();
        var data = all.Skip(skip).Take(pageSize);

        pagingDto.TotalRecords = totalRecords;
        pagingDto.Data = data;

        return actionResult.BuildResult(pagingDto);
    }

    public async Task<AppActionResult> GetProductByCollection(string id, int pageSize, int pageIndex, int sortOption)
    {
        var actionResult = new AppActionResult();
        PagingDto pagingDto = new PagingDto();
        int skip = CalculateHelper.CalculatePaging(pageSize, pageIndex);

        if(sortOption < 0 || sortOption > (SortConstants.SortOptions.Length - 1))
        {
            return actionResult.BuildError("Invalid sort");
        }
        string sortString = SortConstants.SortOptions[sortOption];

        if(!Guid.TryParse(id, out Guid collectionId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }

        var all = _collectionRepo.Entities().Where(c => c.Id == collectionId).Include(c => c.Product);
        if (all == null)
        {
            return actionResult.BuildError("Invalid collectionId");
        }

        var totalRecords = await all.CountAsync();
        var data = await all.Skip(skip).Take(pageSize).ToListAsync();

        pagingDto.TotalRecords = totalRecords;
        pagingDto.Data = data;

        return actionResult.BuildResult(pagingDto);
    }

    public async Task<AppActionResult> GetProductByTag(string id, int pageSize, int pageIndex, int sortOption)
    {
        var actionResult = new AppActionResult();
        PagingDto pagingDto = new PagingDto();
        int skip = CalculateHelper.CalculatePaging(pageSize, pageIndex);

        if (sortOption < 0 || sortOption > (SortConstants.SortOptions.Length - 1))
        {
            return actionResult.BuildError("Invalid sort");
        }
        string sortString = SortConstants.SortOptions[sortOption];

        if (!Guid.TryParse(id, out Guid tagId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }

        var all = _tagRepo.Entities().Where(c => c.Id == tagId).Include(c => c.Product);
        if (all == null)
        {
            return actionResult.BuildError("Invalid tagId");
        }

        var totalRecords = await all.CountAsync();
        var data = await all.Skip(skip).Take(pageSize).ToListAsync();

        pagingDto.TotalRecords = totalRecords;
        pagingDto.Data = data;

        return actionResult.BuildResult(pagingDto);
    }

    public async Task<AppActionResult> GetProductByCategory(string id, int pageSize, int pageIndex, int sortOption)
    {
        var actionResult = new AppActionResult();
        PagingDto pagingDto = new PagingDto();
        int skip = CalculateHelper.CalculatePaging(pageSize, pageIndex);

        if (sortOption < 0 || sortOption > (SortConstants.SortOptions.Length - 1))
        {
            return actionResult.BuildError("Invalid sort");
        }
        string sortString = SortConstants.SortOptions[sortOption];

        if (!Guid.TryParse(id, out Guid categoryId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }

        var all = _productRepo.Entities().Where(c => c.CategoryId == categoryId);
        if (all == null)
        {
            return actionResult.BuildError("Invalid categoryId");
        }

        var totalRecords = await all.CountAsync();
        var data = await all.Skip(skip).Take(pageSize).ToListAsync();

        pagingDto.TotalRecords = totalRecords;
        pagingDto.Data = data;

        return actionResult.BuildResult(pagingDto);
    }

    public async Task<AppActionResult> GetProductAll(int pageSize, int pageIndex, int sortOption)
    {
        var actionResult = new AppActionResult();
        PagingDto pagingDto = new PagingDto();
        int skip = CalculateHelper.CalculatePaging(pageSize, pageIndex);

        if(sortOption < 0 || sortOption > SortConstants.SortOptions.Length - 1)
        {
            return actionResult.BuildError("Invalid sort");
        }

        var totalRecords = await _productRepo.Entities().CountAsync();
        var data = await _productRepo.Entities().Skip(skip).Take(pageSize).ToListAsync();

        pagingDto.TotalRecords = totalRecords;
        pagingDto.Data = data;

        return actionResult.BuildResult(pagingDto);
    }

    public async Task<AppActionResult> GetProductNew()
    {
        var actionResult = new AppActionResult();

        var result = await _productRepo.Entities()
            .OrderByDescending(p => p.CreateDate)
            .Take(QuantityConstants.NumberProductNew)
            .ToListAsync();
        return actionResult.BuildResult(result);
    }

    public async Task<AppActionResult> GetProductBestSeller()
    {
        var actionResult = new AppActionResult();
        var result = await _bestSellerRepo.Entities().Include(p => p.Product).ToListAsync();
        return actionResult.BuildResult(result);
    }
}