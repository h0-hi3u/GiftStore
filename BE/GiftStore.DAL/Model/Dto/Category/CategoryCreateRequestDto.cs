namespace GiftStore.DAL.Model.Dto.Category;

public class CategoryCreateRequestDto
{
    public string Name { get; set; }
    public string? Description { get; set; }
    public Guid TagId { get; set; }
}
