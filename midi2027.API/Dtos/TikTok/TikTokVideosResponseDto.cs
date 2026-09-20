using System.Text.Json.Serialization;

namespace midi2027.API.Dtos.TikTok
{
    public class TikTokVideosResponseDto
    {
        [JsonPropertyName("data")]
        public TikTokVideosDataDto? Data { get; set; }
    }
}
