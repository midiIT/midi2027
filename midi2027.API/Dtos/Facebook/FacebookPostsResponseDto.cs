using midi2027.API.Models.Facebook;
using System.Text.Json.Serialization;

namespace midi2027.API.Dtos.Facebook
{
    public class FacebookPostsResponseDto
    {
        [JsonPropertyName("data")]
        public List<FacebookPost> Data { get; set; } = [];
    }
}
