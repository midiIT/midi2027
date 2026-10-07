using System.Text.Json.Serialization;

namespace midi2027.API.Models.Facebook
{
    public class FacebookPost
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;

        [JsonPropertyName("message")]
        public string? Message { get; set; }

        [JsonPropertyName("created_time")]
        public string CreatedTime { get; set; }

        [JsonPropertyName("permalink_url")]
        public string? PermalinkUrl { get; set; }

        [JsonPropertyName("full_picture")]
        public string? FullPicture { get; set; }
    }
}
