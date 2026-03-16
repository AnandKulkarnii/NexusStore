using Ardalis.Specification;
using NexusStore.ApplicationCore.Entities.OrderAggregate;

namespace NexusStore.ApplicationCore.Specifications;

public class CustomerOrdersSpecification : Specification<Order>
{
    public CustomerOrdersSpecification(string buyerId)
    {
        Query.Where(o => o.BuyerId == buyerId)
            .Include(o => o.OrderItems);
    }
}
