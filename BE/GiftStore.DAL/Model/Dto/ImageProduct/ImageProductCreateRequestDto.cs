using GiftStore.DAL.Model.Entity;

namespace GiftStore.DAL.Model.Dto.ImageProduct;

public class ImageProductCreateRequestDto
{
    public string Image { get; set; }
    public Guid ProductId { get; set; }
}
