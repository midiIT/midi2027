using midi2027.API.Common.Constants;
using midi2027.API.Common.Enums;
using midi2027.API.Common.Models;
using midi2027.API.Dtos.Instagram;
using midi2027.API.Models.Instagram;
using System.Net.Http.Headers;
using System.Text.Json;

namespace midi2027.API.Services
{
    public class InstagramService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<InstagramService> _logger;
        private readonly AppSettingsService _settings;

        public InstagramService(HttpClient httpClient, ILogger<InstagramService> logger, AppSettingsService settings)
        {
            _httpClient = httpClient;
            _logger = logger;
            _settings = settings;
        }
        public async Task<Result<List<InstagramPost>>> GetLatestPostAsync(int limit)
        {
            var url =
                $"https://graph.instagram.com/{_settings.Instagram.ApiVersion}/{_settings.Instagram.UserId}/media" +
                "?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp" +
                $"&limit={limit}";

            try
            {
                _logger.LogInformation("Requesting latest Instagram post");

                using var request = new HttpRequestMessage(HttpMethod.Get, url);

                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _settings.Instagram.AccessToken);

                var response = await _httpClient.SendAsync(request);

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();

                    _logger.LogError(LogMessages.Instagram.API_REQUEST_FAILURE, response.StatusCode, error);

                    return ErrorType.INSTAGRAM_API_ERROR;
                }

                var json = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<InstagramMediaResponseDto>(json,
                    new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                _logger.LogInformation(LogMessages.Instagram.RESPONSE_SUCCESS);

                if (result?.Data == null || result.Data.Count == 0)
                    return ErrorType.NOT_FOUND;

                return result.Data;
            }
            catch (Exception ex)
            {
                _logger.LogError(LogMessages.CAUGHT_EXCEPTION, ex.Message);

                return ErrorType.INSTAGRAM_EXCEPTION;
            }
        }
    }
}
