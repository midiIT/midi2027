using midi2027.API.Common.Constants;
using midi2027.API.Common.Enums;
using midi2027.API.Common.Models;

namespace midi2027.API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (OperationCanceledException)
                when (context.RequestAborted.IsCancellationRequested)
            {
                _logger.LogInformation(LogMessages.REQUEST_CANCELED);
            }
            catch (Exception ex)
            {
                _logger.LogError(LogMessages.CAUGHT_EXCEPTION, ex.Message);

                await WriteErrorResponseAsync(context);
            }
        }

        private static async Task WriteErrorResponseAsync(HttpContext context)
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            context.Response.ContentType = "application/json";

            var response = ErrorResponse.Create(ErrorType.INTERNAL_SERVER_ERROR);

            await context.Response.WriteAsJsonAsync(response);
        }
    }
}
