using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using midi2027.API.Services;

namespace midi2027.API.Controllers
{
    [ApiController]
    [Route("api/latest-feed")]
    [EnableRateLimiting("LatestFeedPolicy")]
    public class LatestFeedController : ControllerBase
    {
        private readonly InstagramService _instagramService;
        private readonly FacebookService _facebookService;
        private readonly TikTokService _tikTokService;
        private readonly LatestFeedCache _cache;

        public LatestFeedController(
            InstagramService instagramService,
            FacebookService facebookService,
            TikTokService tikTokService,
            LatestFeedCache cache)
        {
            _instagramService = instagramService;
            _facebookService = facebookService;
            _tikTokService = tikTokService;
            _cache = cache;
        }
        [HttpGet("tiktok")]
        public async Task<IActionResult> GetTikTokPosts([FromQuery] int limit = 1)
        {
            if (limit is < 1 or > 20)
                return BadRequest("Limit must be between 1 and 20.");

            var result = await _cache.GetAsync("tiktok", () => _tikTokService.GetLatestPostsAsync(20));

            if (result.IsError)
                return BadRequest(result.Error);

            return Ok(result.Value.Take(limit).ToList());
        }
        [HttpGet("instagram")]
        public async Task<IActionResult> GetLatestInstagramFeed([FromQuery] int limit = 1)
        {
            if (limit is < 1 or > 20)
                return BadRequest("Limit must be between 1 and 20.");

            var postResult = await _cache.GetAsync("instagram", () => _instagramService.GetLatestPostAsync(20));

            if (!postResult.TryGetResult(out var post))
                return NotFound("No Instagram posts found.");

            return Ok(post.Take(limit).ToList());
        }
        [HttpGet("facebook")]
        public async Task<IActionResult> GetLatestFacebookFeed([FromQuery] int limit = 1)
        {
            if (limit is < 1 or > 20)
                return BadRequest("Limit must be between 1 and 20.");

            var postResult = await _cache.GetAsync("facebook", () => _facebookService.GetLatestPostAsync(20));

            if (!postResult.TryGetResult(out var post))
                return NotFound("No Facebook posts found.");

            return Ok(post.Take(limit).ToList());
        }


    }
}
