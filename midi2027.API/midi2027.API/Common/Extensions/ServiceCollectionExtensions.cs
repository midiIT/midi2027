using midi2027.API.Models.Settings;
using midi2027.API.Services;

namespace midi2027.API.Common.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAppSettings(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<InstagramSettings>(
                    configuration.GetSection("Instagram"));
            services.Configure<FacebookSettings>(
                    configuration.GetSection("Facebook"));

            services.AddSingleton<AppSettingsService>();
            services.AddHttpClient<InstagramService>();
            services.AddHttpClient<FacebookService>();

            return services;
        }
    }
}
