namespace GiftStore.DAL.Model.Dto.Supplier;

public class SupplierCreateRequestDto
{
    public string Name { get; set; }
    public string Address { get; set; }
    public string Telephone { get; set; }
    public string Email { get; set; }
    public DateTime CooperationDay { get; set; }
}
