namespace GiftStore.DAL.Model.Entity;

public class Collection
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public bool IsDeleted { get; set; }
    public virtual ICollection<Product> Product { get; set; }
}
