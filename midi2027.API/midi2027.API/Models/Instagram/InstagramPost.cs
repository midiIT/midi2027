using System.Text.Json.Serialization;

namespace midi2027.API.Models.Instagram
{
    public class InstagramPost
    {
        public string Id { get; set; } = string.Empty;

        public string? Caption { get; set; }

        [JsonPropertyName("media_type")]
        public string MediaType { get; set; } = string.Empty;

        [JsonPropertyName("media_url")]
        public string? MediaUrl { get; set; }

        [JsonPropertyName("thumbnail_url")]
        public string? ThumbnailUrl { get; set; }

        public string? Permalink { get; set; }

        public string Timestamp { get; set; } = string.Empty;
    }
}
