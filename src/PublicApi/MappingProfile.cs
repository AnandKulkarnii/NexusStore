using AutoMapper;
using NexusStore.ApplicationCore.Entities;
using NexusStore.PublicApi.CatalogBrandEndpoints;
using NexusStore.PublicApi.CatalogItemEndpoints;
using NexusStore.PublicApi.CatalogTypeEndpoints;

namespace NexusStore.PublicApi;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CatalogItem, CatalogItemDto>();
        CreateMap<CatalogType, CatalogTypeDto>()
            .ForMember(dto => dto.Name, options => options.MapFrom(src => src.Type));
        CreateMap<CatalogBrand, CatalogBrandDto>()
            .ForMember(dto => dto.Name, options => options.MapFrom(src => src.Brand));
    }
}
