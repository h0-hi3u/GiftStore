using GiftStore.DAL.Model.Dto.ImageProduct;

namespace GiftStore.DAL.Model.Dto.Product;

public class ChildProductCreateRequestDto
{
    public double Price { get; set; }

    public int Quantity { get; set; }

    public string? Variant { get; set; }

    public Guid ParentId { get; set; }
    public virtual ICollection<ImageProductCreateRequestDto> ImageProduct { get; set; } = new List<ImageProductCreateRequestDto>();
}
