namespace GiftStore.DAL.Model.Entity;

public class Supplier
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public string Telephone { get; set; }
    public string Email { get; set; }
    public DateTime CooperationDay { get; set; }
    public bool IsDeleted { get; set; }

}
