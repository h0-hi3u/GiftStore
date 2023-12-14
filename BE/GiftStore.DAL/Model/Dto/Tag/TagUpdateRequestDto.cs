namespace GiftStore.DAL.Model.Dto.Tag;

public class TagUpdateRequestDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
}
