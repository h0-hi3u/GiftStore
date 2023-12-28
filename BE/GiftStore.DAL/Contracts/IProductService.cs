using GiftStore.Core.Common;
using GiftStore.DAL.Model.Entity;

namespace GiftStore.DAL.Contracts;

public interface IProductService
{
    Task<AppActionResult> GetAllAsync();
    Task<AppActionResult> GetDetail(string id);
    Task<AppActionResult> AddProduct();
    Task<AppActionResult> GetProductBySearch(string? searchText, int pageSize, int pageIndex);
    Task<AppActionResult> GetProductByCollection(string id, int pageSize, int pageIndex, int sortOption);
    Task<AppActionResult> GetProductByTag(string id, int pageSize, int pageIndex, int sortOption);
    Task<AppActionResult> GetProductByCategory(string id, int pageSize, int pageIndex, int sortOption);
    Task<AppActionResult> GetProductAll(int pageSize, int pageIndex, int sortOption);
    Task<AppActionResult> GetProductNew();
    Task<AppActionResult> GetProductBestSeller();

}
