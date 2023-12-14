using GiftStore.Core.Common;
using GiftStore.DAL.Model.Dto.User;

namespace GiftStore.DAL.Contracts;

public interface IUserService
{
    Task<AppActionResult> GetAllAsync();
    Task<AppActionResult> GetDetailAsync(string id);
    Task<AppActionResult> CreateAsync(UserCreateRequestDto userCreateRequestDto);
    Task<AppActionResult> UpdateAsync(UserUpdateRequestDto userUpdateRequestDto);
    Task<AppActionResult> DeleteAsync(string id);
}
