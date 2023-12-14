namespace GiftStore.DAL.Model.Dto.User;

public class UserShowResponseDto
{
    public Guid Id { get; set; } 
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }
    public int VIP { get; set; }
}
