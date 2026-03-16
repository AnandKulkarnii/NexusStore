using System.Threading.Tasks;
using NexusStore.ApplicationCore.Entities.OrderAggregate;

namespace NexusStore.ApplicationCore.Interfaces;

public interface IOrderService
{
    Task CreateOrderAsync(int basketId, Address shippingAddress);
}
