using GiftStore.DAL.Model.Dto.ImageProduct;
namespace GiftStore.DAL.Model.Dto.Product;

public class ProductShowResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
    public string Variant { get; set; }
    public bool IsParent { get; set; }
    public string? Description { get; set; }
    public virtual ICollection<ImageProductShowResponseDto> ImageProduct { get; set; } = new List<ImageProductShowResponseDto>();
}
