namespace midi2027.API.Common.Enums
{
    public enum ErrorType
    {
        NONE = 0,

        // 0xxx - Non critical errors
        NOT_FOUND = 4,
        INTERNAL_SERVER_ERROR = 5,
        BAD_REQUEST = 6,

        // 11xx


        // 10xx - Instagram errors
        INSTAGRAM_EXCEPTION = 1000,
        INSTAGRAM_API_ERROR = 1001,
        INSTAGRAM_RESPONSE_INVALID = 1002,

        // 11xx - Instagram errors
        FACEBOOK_EXCEPTION = 1100,
        FACEBOOK_API_ERROR = 1101,
        FACEBOOK_RESPONSE_INVALID = 1102

    }
}
