namespace GiftStore.DAL.Model.Dto.Category;

public class CategoryUpdateRequestDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public Guid TagId { get; set; }
}
