using midi2027.API.Common.Enums;
using System.Text.Json.Serialization;

namespace midi2027.API.Common.Models
{
    public class ErrorResponse
    {
        private ErrorResponse(ErrorType error)
        {
            Error = new Error(error);
        }
        private ErrorResponse(ErrorType error, string? message)
        {
            Error = new Error(error, message);
        }
        private ErrorResponse(ErrorType error, string[] reasons)
        {
            Error = new Error(error, reasons);
        }

        public Error Error { get; set; }

        public static ErrorResponse Create(ErrorType error) => new ErrorResponse(error);
        public static ErrorResponse Create(ErrorType error, string? message) => new ErrorResponse(error, message);
        public static ErrorResponse Create(ErrorType error, string[] reasons) => new ErrorResponse(error, reasons);
    }

    public class Error
    {
        public Error(ErrorType code)
        {
            Code = (int)code;
            Message = GetMessageFromCode(code);
        }

        public Error(ErrorType code, string? message)
        {
            Code = (int)code;

            if (!string.IsNullOrEmpty(message))
                Message = message;
            else Message = GetMessageFromCode(code);
        }

        public Error(ErrorType code, string[] reasons)
        {
            Code = (int)code;
            Reasons = reasons;
        }

        public int Code { get; set; }
        public string Message { get; set; }
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string[] Reasons { get; set; }

        private static string GetMessageFromCode(ErrorType errorType)
        {
            return errorType.ToString();
        }
    }
}
