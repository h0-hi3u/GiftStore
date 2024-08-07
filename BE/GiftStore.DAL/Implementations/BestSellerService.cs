﻿using Autofac;
using AutoMapper;
using GiftStore.Core.Common;
using GiftStore.Core.Constants;
using GiftStore.Core.Contracts;
using GiftStore.DAL.Contracts;
using GiftStore.DAL.Model.Dto.BestSeller;
using GiftStore.DAL.Model.Dto.Product;
using GiftStore.DAL.Model.Entity;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace GiftStore.DAL.Implementations;

public class BestSellerService : GenericService, IBestSellerService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRepository<BestSeller> _bestSellerRepo;
    private readonly IRepository<OrderDetail> _orderDetailRepo;
    private readonly IRepository<Product> _productRepo;
    private readonly IMapper _mapper;

    public BestSellerService(ILifetimeScope scope, IMapper mapper) : base(scope)
    {
        _unitOfWork = Resolve<IUnitOfWork>();
        _bestSellerRepo = _unitOfWork.Repository<BestSeller>();
        _orderDetailRepo = _unitOfWork.Repository<OrderDetail>();
        _productRepo = _unitOfWork.Repository<Product>();
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
        }
        catch
        {
            return actionResult.BuildError(MessageConstants.ERR_ADD_FAIL);
        }
    }

    public async Task<AppActionResult> DeleteAsync(string id)
    {
        var actionResult = new AppActionResult();
        if (!Guid.TryParse(id, out Guid bestSellerId))
        {
            return actionResult.BuildError(MessageConstants.ERR_INVALID_GUID);
        }

        var bestSeller = await _bestSellerRepo.GetAsync(bestSellerId);
        if (bestSeller == null)
        {
            return actionResult.BuildError(MessageConstants.ERR_NOT_FOUND);
        }
        try
        {
            _bestSellerRepo.Delete(bestSeller.Id);
            await _unitOfWork.Commit();
            return actionResult.SetInfo(true, MessageConstants.MSG_ADD_SUCCESS);
        }
        catch
        {
            return actionResult.BuildError(MessageConstants.ERR_DELETE_FAIL);
        }
    }

    //public async Task UpdateBestSeller()
    //{
    //    // clear BestSeller
    //    var listRemove = await _bestSellerRepo.GetAllAsync();
    //    _bestSellerRepo.Entities().RemoveRange(listRemove);
    //    await _unitOfWork.Commit();

    //   try
    //    {
    //        // get bestSeller and add new BestSeller
    //        DateTime lastWeek = DateTime.Now.AddDays(-7);
    //        List<BestSellerCreateRequestDto> listBS = new List<BestSellerCreateRequestDto>();
    //        var listOD = _orderDetailRepo.Entities().Include(od => od.Order);
    //        var a = listOD.Select(x => x.ProductId).Distinct();
    //        foreach (var item in a)
    //        {
    //            double totalSellered = 0;
    //            int numberSellerd = 0;
    //            var list = await listOD.Where(od => od.ProductId == item && od.Order.TimeCreate >= lastWeek).ToListAsync();
    //            foreach (var k in list)
    //            {
    //                totalSellered = totalSellered + (double)(k.Price * k.Quantity - (k.Quantity * k.Price * k.Discount));
    //                numberSellerd += k.Quantity;
    //            }
    //            var bs = new BestSellerCreateRequestDto
    //            {
    //                ProductId = item,
    //                TotalPriceSelled = totalSellered,
    //                NumberSelled = numberSellerd
    //            };
    //            listBS.Add(bs);
    //        }
    //        var data = listBS.OrderByDescending(o => o.NumberSelled);
    //        var result = _mapper.Map<List<BestSeller>>(data);
    //        await _bestSellerRepo.AddRangeAsync(result);
    //        await _unitOfWork.Commit();
    //    } catch(Exception ex)
    //    {
    //        Console.WriteLine(ex.ToString());
    //    }
    //}
    public async Task UpdateBestSeller()
    {
        try
        {
            // clear BestSeller
            var listRemove = await _bestSellerRepo.GetAllAsync();
            _bestSellerRepo.Entities().RemoveRange(listRemove);
            await _unitOfWork.Commit();
            DateTime lastWeek = DateTime.Now.AddDays(-7);
            var orderDetails = _orderDetailRepo.Entities().Include(od => od.Order).Where(od => od.Order.TimeCreate >= lastWeek);
            var listBestSeller = orderDetails.GroupBy(od => od.ProductId).Select(od => new BestSellerCreateRequestDto
            {
                ProductId = od.Select(od => od.ProductId).SingleOrDefault(),
                TotalPriceSold = (double)od.Sum(od => od.Price * od.Quantity - od.Price * od.Quantity * od.Discount),
                NumberSold = od.Sum(od => od.Quantity)
            });
            var result = _mapper.Map<List<BestSeller>>(listBestSeller);
            await _bestSellerRepo.AddRangeAsync(result);
            await _unitOfWork.Commit();
        } catch (Exception ex)
        {
            var a = ex.Message;
        }
    }

    public async Task<AppActionResult> GetProductBestSeller()
    {
        var actionResult = new AppActionResult();
        var listBS = await _bestSellerRepo.Entities().Include(bs => bs.Product).Include(bs => bs.Product.ImageProduct).ToListAsync();
        List<Product> listResult = new List<Product>();
        foreach(var item in listBS)
        {
            if(item.Product.IsParent)
            {
                listResult.Add(item.Product);
            }
            else
            {
                var p = await _productRepo.Entities().Include(p => p.ImageProduct).SingleOrDefaultAsync(p => p.Id == item.Product.ParentId);
                if (p != null)
                {
                    listResult.Add(p);
                }
            }
        }
        var list = listResult.DistinctBy(p => p.Id);
        var data = _mapper.Map<IEnumerable<ProductShowResponseDto>>(list.Take(8));
        return actionResult.BuildResult(data);
        //var listBSId = _bestSellerRepo.Entities().Select(bs => bs.ProductId).ToList().Distinct();
        //List<Product> listProduct = new List<Product>();
        
        //foreach(var item in listBSId)
        //{
        //    var a = await _productRepo.GetAsync(item);
        //    Product? product = await _productRepo.Entities().Include(p => p.ImageProduct).SingleOrDefaultAsync(p => p.Id == item);
        //    listProduct.Add(product);
        //}
        //var data = _mapper.Map<IEnumerable<ProductShowResponseDto>>(listProduct);
        //return actionResult.BuildResult(data);
    }
}
