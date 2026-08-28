using midi2027.API.Common.Extensions;
using midi2027.API.Middleware;
using Serilog;

namespace midi2027.API
{
    public class Program
    { 
        public static void Main(string[] args)
        {
            try
            {
                var builder = WebApplication.CreateBuilder(args);

                builder.Host.UseSerilog((context, configuration) =>
                {
                    configuration.ReadFrom.Configuration(context.Configuration);
                });

                builder.WebHost.UseUrls("http://localhost:5000");
                // Add services to the container.

                builder.Services.AddControllers();
                // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
                builder.Services.AddEndpointsApiExplorer();
                builder.Services.AddSwaggerGen();
                builder.Services.AddAppSettings(builder.Configuration);

                var app = builder.Build();

                // Configure the HTTP request pipeline.
                if (app.Environment.IsDevelopment())
                {
                    app.UseSwagger();
                    app.UseSwaggerUI();
                }
                app.UseMiddleware<TraceLoggingMiddleware>();

                app.UseAuthorization();

                app.MapControllers();

                app.Run();
            }
            catch(Exception ex)
            {
                using var startupLogger = new StreamWriter("failed-startup.log");
                startupLogger.WriteLine("Application failed to start");
                startupLogger.WriteLine("Exception message: " + ex.Message);
                startupLogger.WriteLine("Inner exception message:" + ex.InnerException?.Message);
            }
        }
    }
}

