using GiftStore.DAL.Model.Entity;
namespace GiftStore.DAL.Model.Dto.Product;

public class ProductShowResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
    public bool IsParent { get; set; }
    public string? Description { get; set; }
    public virtual ICollection<Entity.ImageProduct> ImageProduct { get; set; } = new List<Entity.ImageProduct>();
}
