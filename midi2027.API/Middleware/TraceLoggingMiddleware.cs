using System.Diagnostics;

namespace midi2027.API.Middleware
{
    public class TraceLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<TraceLoggingMiddleware> _logger;

        public TraceLoggingMiddleware(RequestDelegate next, ILogger<TraceLoggingMiddleware> logger)
        {
            _logger = logger;
            _next = next;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            var traceId =
                Activity.Current?.TraceId.ToString()
                ?? context.TraceIdentifier;

            using (_logger.BeginScope(new Dictionary<string, object>
            {
                ["TraceIdentifier"] = traceId
            }))
            {
                await _next(context);
            }
        }
    }
}
