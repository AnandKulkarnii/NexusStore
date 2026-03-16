using Ardalis.Specification.EntityFrameworkCore;
using NexusStore.ApplicationCore.Interfaces;

namespace NexusStore.Infrastructure.Data;

public class EfRepository<T> : RepositoryBase<T>, IReadRepository<T>, IRepository<T> where T : class, IAggregateRoot
{
    public EfRepository(CatalogContext dbContext) : base(dbContext)
    {
    }
}
