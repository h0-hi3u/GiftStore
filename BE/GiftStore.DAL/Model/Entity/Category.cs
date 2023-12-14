namespace GiftStore.DAL.Model.Entity;

public class Category
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public bool IsDeleted { get; set; }
    public Guid TagId { get; set; }
    public Tag Tag { get; set; }

    public virtual ICollection<Product> Products { get; set; }

}
