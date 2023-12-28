using GiftStore.DAL.Model.Dto.Category;

namespace GiftStore.DAL.Model.Dto.Tag;

public class TagShowResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public ICollection<CategoryShowResponseDto> Category { get; set; }
}
