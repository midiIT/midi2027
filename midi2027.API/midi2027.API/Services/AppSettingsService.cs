using Microsoft.Extensions.Options;
using midi2027.API.Models.Settings;

namespace midi2027.API.Services
{
    public class AppSettingsService
    {
        public InstagramSettings Instagram { get; }
        public FacebookSettings Facebook { get; }
        public AppSettingsService(
            IOptions<InstagramSettings> instagram,
            IOptions<FacebookSettings> facebook
        )
        {
            Instagram = instagram.Value;
            Facebook = facebook.Value;

            ValidateInstagramOptions();
            ValidateDFacebookOptions();
        }
        private void ValidateInstagramOptions()
        {
            if (string.IsNullOrWhiteSpace(Instagram.UserId))
                throw new InvalidOperationException("Instagram: UserId is empty");

            if (string.IsNullOrWhiteSpace(Instagram.ApiVersion))
                throw new InvalidOperationException("Instagram: ApiVersion is empty");

            if (string.IsNullOrWhiteSpace(Instagram.AccessToken))
                throw new InvalidOperationException("Instagram: AccessToken is empty");
        }
        private void ValidateDFacebookOptions()
        {
            if (string.IsNullOrWhiteSpace(Facebook.AccessToken))
                throw new InvalidOperationException("Facebook: AccessToken is empty");

            if (string.IsNullOrWhiteSpace(Facebook.ApiVersion))
                throw new InvalidOperationException("Facebook: ApiVersion is empty");

            if (string.IsNullOrWhiteSpace(Facebook.PageId))
                throw new InvalidOperationException("Facebook: PageId is empty");
        }

    }
}
