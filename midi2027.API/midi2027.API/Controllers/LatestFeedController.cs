using Microsoft.AspNetCore.Mvc;
using midi2027.API.Services;

namespace midi2027.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LatestFeedController : ControllerBase
    {
        private readonly InstagramService _instagramService;

        public LatestFeedController(InstagramService instagramService)
        {
            _instagramService = instagramService;
        }

        [HttpGet("Instagram")]
        public async Task<IActionResult> GetLatestFeed()
        {
            var post = await _instagramService.GetLatestPostAsync();

            if (post == null)
                return NotFound("No Instagram posts found.");

            return Ok(post);
        }
    }
}
