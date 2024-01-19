using GiftStore.Core.Common;
using GiftStore.DAL.Model.Dto.User;

namespace GiftStore.DAL.Contracts;

public interface IUserService
{
    Task<AppActionResult> GetAllAsync();
    Task<AppActionResult> GetDetailAsync(string id);
    Task<AppActionResult> LoginAsync(UserLoginRequestDto userLoginRequestDto);
    Task<AppActionResult> RegisterAsync(UserRegisterRequestDto userRegisterRequestDto);
    Task<AppActionResult> UpdateAsync(UserUpdateRequestDto userUpdateRequestDto);
    Task<AppActionResult> DeleteAsync(string id);
    Task<AppActionResult> CheckEmailExist(string email);
    Task<AppActionResult> CheckPhoneNumberExist(string phoneNumber);
}
