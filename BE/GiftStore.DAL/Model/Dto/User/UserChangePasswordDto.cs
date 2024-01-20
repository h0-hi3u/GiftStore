namespace GiftStore.DAL.Model.Dto.User;

public class UserChangePasswordDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string NewPassword { get; set; }
}
