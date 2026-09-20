using System.Text.Json.Serialization;

namespace midi2027.API.Models.TikTok
{
    public class TikTokPost
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [JsonPropertyName("title")]
        public string? Title { get; set; }

        [JsonPropertyName("video_description")]
        public string? VideoDescription { get; set; }

        [JsonPropertyName("create_time")]
        public long CreateTime { get; set; }

        [JsonPropertyName("cover_image_url")]
        public string? CoverImageUrl { get; set; }

        [JsonPropertyName("share_url")]
        public string? ShareUrl { get; set; }

        [JsonPropertyName("embed_link")]
        public string? EmbedLink { get; set; }
    }
}
