using NexusStore.ApplicationCore.Interfaces;

namespace NexusStore.ApplicationCore.Entities;

public class CatalogType : BaseEntity, IAggregateRoot
{
    public string Type { get; private set; }
    public CatalogType(string type)
    {
        Type = type;
    }
}
