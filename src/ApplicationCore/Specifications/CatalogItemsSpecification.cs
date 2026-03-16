using System;
using System.Linq;
using Ardalis.Specification;
using NexusStore.ApplicationCore.Entities;

namespace NexusStore.ApplicationCore.Specifications;

public class CatalogItemsSpecification : Specification<CatalogItem>
{
    public CatalogItemsSpecification(params int[] ids)
    {
        Query.Where(c => ids.Contains(c.Id));
    }
}
