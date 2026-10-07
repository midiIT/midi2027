using System;
using System.Text.RegularExpressions;

namespace midi2027.API.Helpers;

public static class PostCleaner
{
    public static string? CleanCaption(string? caption)
    {
        if (string.IsNullOrWhiteSpace(caption))
            return caption;

        return Regex.Replace(caption, @"\s*\bedit_requested=(true|false)\b", string.Empty, RegexOptions.IgnoreCase).Trim();
    }
}
