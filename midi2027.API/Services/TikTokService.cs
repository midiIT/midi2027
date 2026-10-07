using Microsoft.Extensions.Caching.Memory;
using midi2027.API.Common.Enums;
using midi2027.API.Common.Models;
using midi2027.API.Dtos.TikTok;
using midi2027.API.Models.TikTok;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace midi2027.API.Services
{
    public class TikTokService
    {
        private const string AuthorizationUrl = "https://www.tiktok.com/v2/auth/authorize/";
        private const string TokenUrl = "https://open.tiktokapis.com/v2/oauth/token/";  
        private const string VideoListUrl = "https://open.tiktokapis.com/v2/video/list/";
        private readonly AppSettingsService _settings;
        private readonly ILogger<TikTokService> _logger;
        private readonly HttpClient _httpClient;
        private readonly TikTokTokenStore _tokenStore;
        private readonly IMemoryCache _cache;
        public TikTokService(
            AppSettingsService settings,
            ILogger<TikTokService> logger,
            HttpClient httpClient,
            TikTokTokenStore tokenStore,
            IMemoryCache cache)
        {
            _settings = settings;
            _logger = logger;
            _httpClient = httpClient;
            _tokenStore = tokenStore;
            _cache = cache;
        }
        public string CreateAuthorizationUrl()
        {
            var state = GenerateRandomString();
            var codeVerifier = GenerateRandomString();
            var codeChallenge = GenerateCodeChallenge(codeVerifier);

            _cache.Set(
                $"tiktok-pkce-{state}",
                codeVerifier,
                TimeSpan.FromMinutes(10));

            return AuthorizationUrl +
                   $"?client_key={Uri.EscapeDataString(_settings.TikTok.ClientKey)}" +
                   $"&scope={Uri.EscapeDataString(_settings.TikTok.Scopes)}" +
                   "&response_type=code" +
                   $"&redirect_uri={Uri.EscapeDataString(_settings.TikTok.RedirectUri)}" +
                   $"&state={Uri.EscapeDataString(state)}" +
                   $"&code_challenge={codeChallenge}" +
                   "&code_challenge_method=S256";
        }

        public async Task<TikTokTokenResponseDto?> ExchangeCodeAsync(string code, string state)
        {
            if (!_cache.TryGetValue(
                $"tiktok-pkce-{state}",
                out string? codeVerifier) ||
            string.IsNullOrWhiteSpace(codeVerifier))
            {
                _logger.LogError(
                    "TikTok OAuth state/code verifier not found or expired");

                return null;
            }
            var form = new Dictionary<string, string>
            {
                ["client_key"] = _settings.TikTok.ClientKey,
                ["client_secret"] = _settings.TikTok.ClientSecret,
                ["code"] = code,
                ["grant_type"] = "authorization_code",
                ["redirect_uri"] = _settings.TikTok.RedirectUri,
                ["code_verifier"] = codeVerifier
            };

            using var content = new FormUrlEncodedContent(form);

            var response = await _httpClient.PostAsync(
                TokenUrl,
                content);

            var json = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("TikTok token request failed. StatusCode: {StatusCode}. Response: {Response}",response.StatusCode, json);

                return null;
            }

            _cache.Remove($"tiktok-pkce-{state}");

            return JsonSerializer.Deserialize<TikTokTokenResponseDto>(
                json,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
        }

        public async Task<Result<List<TikTokPost>>> GetLatestPostsAsync(int limit)
        {
            var url = VideoListUrl + "?fields=id,title,video_description,create_time,cover_image_url,share_url,embed_link";

            try
            {
                _logger.LogInformation("Requesting latest {Limit} TikTok posts", limit);

                var accessToken = await GetValidAccessTokenAsync();

                if (string.IsNullOrWhiteSpace(accessToken))
                    return ErrorType.TIKTOK_API_ERROR;

                using var request = new HttpRequestMessage(HttpMethod.Post, url);

                request.Headers.Authorization =
                    new AuthenticationHeaderValue("Bearer", accessToken);

                request.Content = JsonContent.Create(new
                {
                    max_count = limit
                });

                var response = await _httpClient.SendAsync(request);

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();

                    _logger.LogError("TikTok API request failed. StatusCode: {StatusCode}. Response: {Response}", response.StatusCode, error);
                    return ErrorType.TIKTOK_API_ERROR;
                }

                var json = await response.Content.ReadAsStringAsync();

                var result =
                    JsonSerializer.Deserialize<TikTokVideosResponseDto>(
                        json,
                        new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        });

                var posts = result?.Data?.Videos;

                if (posts == null || posts.Count == 0)
                    return ErrorType.NOT_FOUND;

                return posts;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while getting TikTok posts");

                return ErrorType.TIKTOK_EXCEPTION;
            }
        }

        private static string GenerateRandomString()
        {
            return Convert.ToHexString(
                    RandomNumberGenerator.GetBytes(32))
                .ToLowerInvariant();
        }

        private static string GenerateCodeChallenge(
            string codeVerifier)
        {
            var bytes =
                SHA256.HashData(
                    Encoding.UTF8.GetBytes(codeVerifier));

            return Convert.ToHexString(bytes)
                .ToLowerInvariant();
        }
        private async Task<string?> GetValidAccessTokenAsync()
        {
            var token = await _tokenStore.GetAsync();

            if (token == null)
                return null;

            if (token.AccessTokenExpiresAtUtc > DateTime.UtcNow.AddMinutes(10))
                return token.AccessToken;

            var refreshedToken = await RefreshAccessTokenAsync(
                token.RefreshToken);

            if (refreshedToken == null)
                return null;

            await _tokenStore.SaveAsync(refreshedToken);

            return refreshedToken.AccessToken;
        }
        private async Task<TikTokTokenResponseDto?> RefreshAccessTokenAsync(string refreshToken)
        {
            var form = new Dictionary<string, string>
            {
                ["client_key"] = _settings.TikTok.ClientKey,
                ["client_secret"] = _settings.TikTok.ClientSecret,
                ["grant_type"] = "refresh_token",
                ["refresh_token"] = refreshToken
            };

            using var content = new FormUrlEncodedContent(form);

            var response = await _httpClient.PostAsync(
                "https://open.tiktokapis.com/v2/oauth/token/",
                content);

            var json = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError("TikTok token refresh failed. StatusCode: {StatusCode}. Response: {Response}",response.StatusCode, json);
                return null;
            }

            return JsonSerializer.Deserialize<TikTokTokenResponseDto>(
                json,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
        }
    }
}

