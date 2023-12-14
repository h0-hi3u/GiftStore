namespace GiftStore.DAL.Model.Entity;

public class Tag
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public bool IsDeleted { get; set; }
    public virtual ICollection<Category> Category { get; set; }
    public virtual ICollection<Product> Product { get; set; }
}
