using System.Collections.Concurrent;
using Microsoft.Extensions.Caching.Memory;
using midi2027.API.Common.Models;

namespace midi2027.API.Services
{
    public class LatestFeedCache
    {
        private readonly IMemoryCache _cache;
        private readonly ConcurrentDictionary<string, SemaphoreSlim> _locks = new();

        public LatestFeedCache(IMemoryCache cache)
        {
            _cache = cache;
        }

        public async Task<Result<List<T>>> GetAsync<T>(string platform, Func<Task<Result<List<T>>>> fetch)
        {
            var key = $"latest-feed:{platform}";
            if (_cache.TryGetValue(key, out Result<List<T>>? cached) && cached != null)
                return cached;

            var gate = _locks.GetOrAdd(platform, _ => new SemaphoreSlim(1, 1));
            await gate.WaitAsync();
            try
            {
                // Recheck after waiting so concurrent visitors share one upstream request.
                if (_cache.TryGetValue(key, out cached) && cached != null)
                    return cached;

                var result = await fetch();
                _cache.Set(key, result, result.IsSuccess
                    ? TimeSpan.FromMinutes(10)
                    : TimeSpan.FromSeconds(30));
                return result;
            }
            finally
            {
                gate.Release();
            }
        }
    }
}
