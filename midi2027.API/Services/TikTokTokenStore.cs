using midi2027.API.Dtos.TikTok;
using midi2027.API.Models.Store.TikTok;
using System.Text.Json;

namespace midi2027.API.Services
{
    public class TikTokTokenStore
    {
        private readonly string _filePath;
        private readonly SemaphoreSlim _lock = new(1, 1);

        public TikTokTokenStore(IWebHostEnvironment environment)
        {
            _filePath = Path.Combine(environment.ContentRootPath,"App_Data", "tiktok-tokens.json");
        }

        public async Task<TikTokTokenMetadata?> GetAsync()
        {
            await _lock.WaitAsync();

            try
            {
                if (!File.Exists(_filePath))
                    return null;

                var json = await File.ReadAllTextAsync(_filePath);

                return JsonSerializer.Deserialize<TikTokTokenMetadata>(json);
            }
            finally
            {
                _lock.Release();
            }
        }

        public async Task SaveAsync(TikTokTokenResponseDto token)
        {
            var now = DateTime.UtcNow;

            var state = new TikTokTokenMetadata
            {
                AccessToken = token.AccessToken,
                RefreshToken = token.RefreshToken,

                AccessTokenExpiresAtUtc = now.AddSeconds(token.ExpiresIn),

                RefreshTokenExpiresAtUtc = now.AddSeconds(token.RefreshExpiresIn),

                OpenId = token.OpenId,
                Scope = token.Scope
            };

            await SaveAsync(state);
        }

        public async Task SaveAsync(TikTokTokenMetadata state)
        {
            await _lock.WaitAsync();

            try
            {
                var directory = Path.GetDirectoryName(_filePath)!;

                Directory.CreateDirectory(directory);

                var json = JsonSerializer.Serialize(
                    state,
                    new JsonSerializerOptions
                    {
                        WriteIndented = true
                    });

                await File.WriteAllTextAsync(_filePath, json);
            }
            finally
            {
                _lock.Release();
            }
        }
    }
}
