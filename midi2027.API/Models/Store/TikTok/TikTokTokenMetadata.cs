namespace midi2027.API.Models.Store.TikTok
{
    public class TikTokTokenMetadata
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime AccessTokenExpiresAtUtc { get; set; }
        public DateTime RefreshTokenExpiresAtUtc { get; set; }
        public string OpenId { get; set; } = string.Empty;
        public string Scope { get; set; } = string.Empty;
    }
}
