using midi2027.API.Common.Enums;

namespace midi2027.API.Common.Models
{
    public class Result
    {
        protected readonly bool _isSuccess;
        protected readonly bool _isWarning;
        protected readonly bool _isSome;

        public ErrorType Error { get; }
        public string? ErrorMessage { get; }
        public string[]? Warnings { get; }

        public bool IsSuccess { get { return _isSuccess; } }
        public bool IsWarning { get { return _isWarning; } }
        public bool IsError { get { return !_isSuccess; } }
        public bool IsSome { get { return _isSome; } }
        public bool IsNone { get { return !_isSome; } }

        protected Result(
            ErrorType error,
            bool isSome,
            bool isSuccess,
            bool isWarning = false,
            string? errorMessage = null,
            string[]? warnings = null)
        {
            _isSome = isSome;
            _isSuccess = isSuccess;
            _isWarning = isWarning;
            Error = error;
            ErrorMessage = errorMessage;
            Warnings = warnings;
        }

        public static implicit operator Result(ErrorType error) => Fail(error);
        public static implicit operator Result(string[] warnings) => Warn(warnings);

        public static Result Ok() => new Result(error: ErrorType.NONE, isSome: false, isSuccess: true);
        public static Result Warn(string[] warnings) => new Result(error: ErrorType.NONE, isSome: false, isSuccess: true, isWarning: true, warnings: warnings);
        public static Result None() => new Result(error: ErrorType.NONE, isSome: false, isSuccess: true);
        public static Result Fail(ErrorType error) => new Result(error: error, isSome: false, isSuccess: false);
        public static Result Fail(ErrorType error, string errorMessage) => new Result(error: error, isSome: false, isSuccess: false, errorMessage: errorMessage);
    }

    public class Result<T> where T : notnull
    {
        protected readonly bool _isSuccess;
        protected readonly bool _isSome;
        protected readonly bool _isWarning;

        private readonly T _value;

        public T Value
        {
            get
            {
                if (!_isSome) throw new Exception($"Attempted to retrieve Result<{typeof(T).Name}> value when no value was present. ");
                return _value;
            }
        }
        public ErrorType Error { get; }
        public string? ErrorMessage { get; }
        public string[]? Warnings { get; }

        public bool IsSuccess { get { return _isSuccess; } }
        public bool IsWarning { get { return _isWarning; } }
        public bool IsError { get { return !_isSuccess; } }
        public bool IsSome { get { return _isSome; } }
        public bool IsNone { get { return !_isSome; } }

        protected Result(
            T value,
            ErrorType error,
            bool isSome,
            bool isSuccess,
            bool isWarning = false,
            string? errorMessage = null,
            string[]? warnings = null)
        {
            _value = value;
            _isSome = isSome;
            _isSuccess = isSuccess;
            _isWarning = isWarning;
            Error = error;
            ErrorMessage = errorMessage;
            Warnings = warnings;
        }

        public bool TryGetResult(out T result)
        {
            if (!_isSuccess || !_isSome)
            {
                result = default;
                return false;
            }

            result = Value;
            return true;
        }

#pragma warning disable CS8604 // Possible null reference argument.
        public static implicit operator Result<T>(Result result) => new Result<T>(value: default, error: result.Error, isSome: result.IsSome, result.IsSuccess, errorMessage: result.ErrorMessage, isWarning: result.IsWarning, warnings: result.Warnings);
#pragma warning restore CS8604 // Possible null reference argument.
        public static implicit operator Result<T>(T value) => Result<T>.Ok(value);
        public static implicit operator Result<T>(ErrorType error) => Result<T>.Fail(error);

        public static Result<T> Ok(T value) => new Result<T>(value: value, error: ErrorType.NONE, isSome: true, isSuccess: true);
        public static Result<T> Warn(T value, string[] warnings) => new Result<T>(value: value, error: ErrorType.NONE, isSome: true, isSuccess: true, isWarning: true, warnings: warnings);
#pragma warning disable CS8604 // Possible null reference argument.
        public static Result<T> None() => new Result<T>(value: default, error: ErrorType.NONE, isSome: false, isSuccess: true);
        public static Result<T> Fail(ErrorType error) => new Result<T>(value: default, error: error, isSome: false, isSuccess: false);
        public static Result<T> Fail(ErrorType error, string errorMessage) => new Result<T>(value: default, error: error, isSome: false, isSuccess: false, errorMessage: errorMessage);
#pragma warning restore CS8604 // Possible null reference argument.
    }
}
