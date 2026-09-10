using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using midi2027.API.Services;

namespace midi2027.API.Controllers
{
    [ApiController]
    [Route("api/lastest-feed")]
    [EnableRateLimiting("LatestFeedPolicy")]
    public class LatestFeedController : ControllerBase
    {
        private readonly InstagramService _instagramService;
        private readonly FacebookService _facebookService;

        public LatestFeedController(
            InstagramService instagramService,
            FacebookService facebookService)
        {
            _instagramService = instagramService;
            _facebookService = facebookService;
        }

        [HttpGet("instagram")]
        public async Task<IActionResult> GetLatestInstagramFeed([FromQuery] int limit = 1)
        {
            if (limit is < 1 or > 20)
                return BadRequest("Limit must be between 1 and 20.");

            var postResult = await _instagramService.GetLatestPostAsync(limit);

            if (!postResult.TryGetResult(out var post))
                return NotFound("No Instagram posts found.");

            return Ok(post);
        }
        [HttpGet("facebook")]
        public async Task<IActionResult> GetLatestFacebookFeed([FromQuery] int limit = 1)
        {
            if (limit is < 1 or > 20)
                return BadRequest("Limit must be between 1 and 20.");

            var postResult = await _facebookService.GetLatestPostAsync(limit);

            if (!postResult.TryGetResult(out var post))
                return NotFound("No Facebook posts found.");

            return Ok(post);
        }


    }
}
