using midi2027.API.Common.Constants;
using midi2027.API.Common.Enums;
using midi2027.API.Common.Models;
using midi2027.API.Dtos.Facebook;
using midi2027.API.Models.Facebook;
using System.Net.Http.Headers;
using System.Text.Json;

namespace midi2027.API.Services
{
    public class FacebookService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<FacebookService> _logger;
        private readonly AppSettingsService _settings;

        public FacebookService(
            HttpClient httpClient,
            ILogger<FacebookService> logger,
            AppSettingsService settings)
        {
            _httpClient = httpClient;
            _logger = logger;
            _settings = settings;
        }

        public async Task<Result<List<FacebookPost>>> GetLatestPostAsync(int limit)
        {
            var url =
                $"https://graph.facebook.com/{_settings.Facebook.ApiVersion}/{_settings.Facebook.PageId}/posts" +
                "?fields=id,message,created_time,permalink_url,full_picture" +
                $"&limit={limit}";

            try
            {
                _logger.LogInformation("Requesting latest Facebook post");

                using var request = new HttpRequestMessage(HttpMethod.Get, url);

                request.Headers.Authorization =
                    new AuthenticationHeaderValue(
                        "Bearer",
                        _settings.Facebook.AccessToken);

                var response = await _httpClient.SendAsync(request);

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();

                    _logger.LogError(
                        LogMessages.Facebook.API_REQUEST_FAILURE,response.StatusCode, error);

                    return ErrorType.FACEBOOK_API_ERROR;
                }

                var json = await response.Content.ReadAsStringAsync();

                var result = JsonSerializer.Deserialize<FacebookPostsResponseDto>(
                                json,
                                new JsonSerializerOptions
                                {
                                    PropertyNameCaseInsensitive = true
                                });

                _logger.LogInformation(LogMessages.Facebook.RESPONSE_SUCCESS);

                if (result?.Data == null || result.Data.Count == 0)
                    return ErrorType.NOT_FOUND;

                return result.Data;
            }
            catch (Exception ex)
            {
                _logger.LogError(LogMessages.CAUGHT_EXCEPTION, ex.Message);

                return ErrorType.FACEBOOK_EXCEPTION;
            }
        }
    }
}
