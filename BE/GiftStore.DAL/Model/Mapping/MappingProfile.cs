﻿using AutoMapper;
using GiftStore.DAL.Model.Dto.Category;
using GiftStore.DAL.Model.Dto.Collection;
using GiftStore.DAL.Model.Dto.Supplier;
using GiftStore.DAL.Model.Dto.Tag;
using GiftStore.DAL.Model.Entity;

namespace GiftStore.DAL.Model.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        TagMappingProfile();
    }

    public void TagMappingProfile()
    {
        CreateMap<Tag, TagShowResponseDto>()
            .ForMember(tsr => tsr.Id, opt => opt.MapFrom(t => t.Id))
            .ForMember(tsr => tsr.Name, opt => opt.MapFrom(t => t.Name))
            .ForMember(tsr => tsr.Description, opt => opt.MapFrom(t => t.Description));

        CreateMap<TagCreateRequestDto, Tag>();
        CreateMap<TagUpdateRequestDto, Tag>();
    }

    public void SupplierMappingProfile()
    {
        CreateMap<Supplier, SupplierShowResponseDto>();
        CreateMap<SupplierCreateRequestDto, Supplier>();
        CreateMap<SupplierUpdateRequestDto, Supplier>();

    }

    public void CategoryMappingProfile()
    {
        CreateMap<Category, CategoryShowResponseDto>();
        CreateMap<CategoryCreateRequestDto, Category>();
        CreateMap<CategoryUpdateRequestDto, Category>();
    }

    public void CollectionMappingProfile()
    {
        CreateMap<Collection, CollectionShowResponseDto>();
        CreateMap<CollectionCreateRequestDto, Collection>();
        CreateMap<CollectionUpdateRequestDto, Collection>();
    }
}