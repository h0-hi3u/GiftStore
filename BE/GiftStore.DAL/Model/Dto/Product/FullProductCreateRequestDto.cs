using GiftStore.DAL.Model.Dto.ImageProduct;

namespace GiftStore.DAL.Model.Dto.Product;
public class FullProductCreateRequestDto
{
    public string Name { get; set; }

    public double Price { get; set; }

    public int Quantity { get; set; }

    public string? Variant { get; set; }

    public Guid CategoryId { get; set; }
    public Guid SupplierId { get; set; }
    public string? Description { get; set; }
    public virtual ICollection<ImageProductCreateRequestDto> ImageProduct { get; set; } = new List<ImageProductCreateRequestDto>();
    public virtual ICollection<ChildProductCreateRequestDto> ChildrenProduct { get; set; } = new List<ChildProductCreateRequestDto>();
}
