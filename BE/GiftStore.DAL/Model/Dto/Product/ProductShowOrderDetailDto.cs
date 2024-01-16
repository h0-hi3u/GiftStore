using GiftStore.DAL.Model.Dto.ImageProduct;

namespace GiftStore.DAL.Model.Dto.Product;

public class ProductShowOrderDetailDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public string Variant { get; set; }
    public string? Description { get; set; }
    public virtual ICollection<ImageProductShowResponseDto> ImageProduct { get; set; } = new List<ImageProductShowResponseDto>();
}
