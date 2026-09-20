using midi2027.API.Models.TikTok;
using System.Text.Json.Serialization;

namespace midi2027.API.Dtos.TikTok
{
    public class TikTokVideosDataDto
    {
        [JsonPropertyName("videos")]
        public List<TikTokPost> Videos { get; set; } = [];

        [JsonPropertyName("cursor")]
        public long Cursor { get; set; }

        [JsonPropertyName("has_more")]
        public bool HasMore { get; set; }
    }
}
