using System.Security.Claims;

namespace GiftStore.Core.Common;

public static class ClaimExtensions
{
    public static void TryGetValue(this IEnumerable<Claim> claims, string clamType, out string value)
    {
        value =claims.FirstOrDefault(c => c.Type == clamType)?.Value ?? string.Empty;
    }

    public static bool IsValidClaim(this string claim)
    {
        return !string.IsNullOrEmpty(claim);
    }
}
