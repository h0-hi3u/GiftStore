using AutoMapper;
using GiftStore.DAL.Model.Dto.BestSeller;
using GiftStore.DAL.Model.Dto.Category;
using GiftStore.DAL.Model.Dto.Collection;
using GiftStore.DAL.Model.Dto.ImageProduct;
using GiftStore.DAL.Model.Dto.Order;
using GiftStore.DAL.Model.Dto.OrderDetail;
using GiftStore.DAL.Model.Dto.PaymentMethod;
using GiftStore.DAL.Model.Dto.Product;
using GiftStore.DAL.Model.Dto.Supplier;
using GiftStore.DAL.Model.Dto.Tag;
using GiftStore.DAL.Model.Dto.User;
using GiftStore.DAL.Model.Entity;

namespace GiftStore.DAL.Model.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        
        ProductMappingProfile();
        TagMappingProfile();
        SupplierMappingProfile();
        CategoryMappingProfile();
        CollectionMappingProfile();
        BestSellerMappingProfile();
        ImageProductMappingProfile();
        UserMappingProfile();
        OrderMappingProfile();
        OrderDetailMappingProfile();
        PaymentMethodMappingProfile();
    }

    private void ProductMappingProfile()
    {
        CreateMap<Product, ProductShowResponseDto>();
        CreateMap<Product, ProductShowOrderDetailDto>();
        CreateMap<ParentProductCreateRequestDto, Product>();
        CreateMap<ChildProductCreateRequestDto, Product>();
        CreateMap<FullProductCreateRequestDto, Product>();
    }

    private void TagMappingProfile()
    {
        CreateMap<Tag, TagShowResponseDto>()
            .ForMember(tsr => tsr.Id, opt => opt.MapFrom(t => t.Id))
            .ForMember(tsr => tsr.Name, opt => opt.MapFrom(t => t.Name))
            .ForMember(tsr => tsr.Description, opt => opt.MapFrom(t => t.Description));

        CreateMap<TagCreateRequestDto, Tag>();
        CreateMap<TagUpdateRequestDto, Tag>();
    }

    private void SupplierMappingProfile()
    {
        CreateMap<Supplier, SupplierShowResponseDto>();
        CreateMap<SupplierCreateRequestDto, Supplier>();
        CreateMap<SupplierUpdateRequestDto, Supplier>();

    }

    private void CategoryMappingProfile()
    {
        CreateMap<Category, CategoryShowResponseDto>();
        CreateMap<CategoryCreateRequestDto, Category>();
        CreateMap<CategoryUpdateRequestDto, Category>();
    }

    private void CollectionMappingProfile()
    {
        CreateMap<Collection, CollectionShowResponseDto>();
        CreateMap<CollectionCreateRequestDto, Collection>();
        CreateMap<CollectionUpdateRequestDto, Collection>();
    }

    private void BestSellerMappingProfile()
    {
        CreateMap<BestSeller, BestSellerShowResponseDto>();
        CreateMap<BestSellerCreateRequestDto, BestSeller>();
    }

    private void ImageProductMappingProfile()
    {
        CreateMap<ImageProduct, ImageProductShowResponseDto>().ReverseMap();
        CreateMap<ImageProductCreateRequestDto, ImageProduct>();
        CreateMap<ImageProductUpdateRequestDto, ImageProduct>();
    }

    private void UserMappingProfile()
    {
        CreateMap<User, UserShowResponseDto>();
        CreateMap<UserUpdateRequestDto, User>();
        CreateMap<UserRegisterRequestDto, User>();
    }
    private void OrderMappingProfile()
    {
        CreateMap<Order, OrderShowResponse>();
        CreateMap<OrderCreateRequestDto, Order>();
    }
    private void OrderDetailMappingProfile()
    {
        CreateMap<OrderDetail, OrderDetailShowResponseDto>();
        CreateMap<OrderDetailCreateDto, OrderDetail>();
    }
    private void PaymentMethodMappingProfile()
    {
        CreateMap<PaymentMethod, PaymentMethodShowResponseDto>();
    }
}
