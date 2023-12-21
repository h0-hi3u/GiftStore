namespace GiftStore.DAL.Model.Entity;

public class Product
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public double Price { get; set; }

    public int Quantity { get; set; }

    public string Variant { get; set; }

    public DateTime CreateDate { get; set; }

    public Guid? ParentId { get; set; }

    public bool IsParent { get; set; }

    public Guid CategoryId { get; set; }
    public Category Category { get; set; }
    public Guid SupplierId { get; set; }
    public Supplier Supplier { get; set; }
    public string? Description { get; set; }
    public bool IsDeleted { get; set; }
    public virtual ICollection<Tag> Tag { get; set; }
    public virtual ICollection<Collection> Collection { get; set; }
    public virtual ICollection<ImageProduct> ImageProduct { get; set; } = new List<ImageProduct>();
}
