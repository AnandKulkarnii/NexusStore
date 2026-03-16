using Ardalis.Specification;
using NexusStore.ApplicationCore.Entities;

namespace NexusStore.ApplicationCore.Specifications;

public class CatalogItemNameSpecification : Specification<CatalogItem>
{
    public CatalogItemNameSpecification(string catalogItemName)
    {
        Query.Where(item => catalogItemName == item.Name);
    }
}
