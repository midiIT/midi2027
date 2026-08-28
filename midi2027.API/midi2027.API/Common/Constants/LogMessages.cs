namespace midi2027.API.Common.Constants
{
    public static class LogMessages
    {
        public const string CAUGHT_EXCEPTION = "Caught exception: \"{message}\"";
        public const string REQUEST_CANCELED = "Request was canceled";

        public static class Instagram
        {
            public const string API_REQUEST_FAILURE = "Instagram API request failed with status code \"{StatusCode}\". Response: \"{response}\"";
            public const string RESPONSE_SUCCESS = "Successfully received latest Instagram post";
        }
    }
}
