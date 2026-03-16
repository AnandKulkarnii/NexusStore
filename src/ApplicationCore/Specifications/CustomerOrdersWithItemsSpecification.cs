using Ardalis.Specification;
using NexusStore.ApplicationCore.Entities.OrderAggregate;

namespace NexusStore.ApplicationCore.Specifications;

public class CustomerOrdersWithItemsSpecification : Specification<Order>
{
    public CustomerOrdersWithItemsSpecification(string buyerId)
    {
        Query.Where(o => o.BuyerId == buyerId)
            .Include(o => o.OrderItems)
                .ThenInclude(i => i.ItemOrdered);
    }
}
