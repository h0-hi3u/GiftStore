using GiftStore.Core.Common;

namespace GiftStore.DAL.Contracts;

public interface IOAuthService
{
    Task<AppActionResult> OAuthWithGoogleAsync(string code);
}
