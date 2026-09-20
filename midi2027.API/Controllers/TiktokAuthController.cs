using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using midi2027.API.Services;

namespace midi2027.API.Controllers
{
    [ApiController]
    [Route("api/tikTokAuth")]
    [EnableRateLimiting("LatestFeedPolicy")]
    public class TiktokAuthController : ControllerBase
    {
        private readonly TikTokService _tikTokService;
        private readonly TikTokTokenStore _tokenStore;
        public TiktokAuthController(
            TikTokService tikTokService,
            TikTokTokenStore tokenStore
        )
        {
            _tikTokService = tikTokService;
            _tokenStore = tokenStore;
        }
        [HttpGet("login")]
        public IActionResult Login()
        {
            var authorizationUrl =
                _tikTokService.CreateAuthorizationUrl();

            return Redirect(authorizationUrl);
        }

        [HttpGet("callback")]
        public async Task<IActionResult> Callback(
            [FromQuery] string code,
            [FromQuery] string state
        )
        {
            var token = await _tikTokService.ExchangeCodeAsync(code, state);

            if (token == null)
                return BadRequest("Failed to authorize TikTok account.");

            await _tokenStore.SaveAsync(token);

            return Ok(new
            {
                message = "TikTok account authorized successfully.",
                expiresIn = token.ExpiresIn,
                scope = token.Scope
            });
        }
    }
}
