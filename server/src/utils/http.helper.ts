
/**
 * Error code match to key "code" in response
 */
export enum ErrorCode {
    EMAIL_EXIST = "EMAIL_EXIST",
    NO_RECORD_FOUND = "NO_RECORD_FOUND",
    INCORRECT_PASSWORD = "INCORRECT_PASSWORD",
    UNAUTHORIZED = "UNAUTHORIZED",
    ALREADY_LOGGED_OUT = "ALREADY_LOGGED_OUT",
    SESSION_LOGOUT_FAIL = "SESSION_LOGOUT_FAIL",
    UNKNOWN = "UNKNOWN",
    NO_PERMISSION_ACCESS_API = "NO_PERMISSION_ACCESS_API",
    INVALID_REDIS_CONNECTION = "INVALID_REDIS_CONNECTION",
    REDIS_CLIENT_NOT_INITIALIZED = "REDIS_NOT_INITIALIZED",
    REDIS_OPERATION_FAILED = "REDIS_OPERATION_FAILED",
}

export enum ErrorMessage {
    EMAIL_EXIST = "Email already exist",
    EMAIL_NOT_EXIST = "Email does not exist",
    INCORRECT_PASSWORD = "Incorrect password",
    INVALID_TOKEN = "Invalid access token",
    UNAUTHORIZED = "Unauthorized access",
    ALREADY_LOGGED_OUT = "This session has already been logged out",
    NO_RECORD_WITH_PROVIDED_INFO = "No record were found with the provided information",
    RECORD_HAS_ALREADY_DELETED = "The record has already been deleted",
    UNKNOWN = "Oops! something went wrong",
    NO_PERMISSION_ACCESS_API = "Oops! you don't have permission to access this API",
    INVALID_REDIS_CONNECTION = "Oops! Invalid redis connection",
    REDIS_CLIENT_NOT_INITIALIZED = "Oops! Redis client not initialized",
    REDIS_OPERATION_FAILED = "Oops! cannot perform operation on redis",
    INVALID_LOGIN_SESSION = "Oops! We couldn't find your session with the provided token. Please ensure you're using a valid access token."
}

/**
 * Enum HttpStatusCode representing common HTTP response status codes.
 * @enum {number}
 */
export enum HttpStatusCode {
    // Informational
    Continue = 100,
    SwitchingProtocols = 101,
    Processing = 102,

    // Success
    OK = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,

    // Redirection
    MultipleChoices = 300,
    MovedPermanently = 301,
    Found = 302,
    SeeOther = 303,
    NotModified = 304,
    TemporaryRedirect = 307,
    PermanentRedirect = 308,

    // Client Errors
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    Conflict = 409,
    Gone = 410,
    PreconditionFailed = 412,
    UnsupportedMediaType = 415,
    UnprocessableEntity = 422,
    TooManyRequests = 429,

    // Server Errors
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HTTPVersionNotSupported = 505,
}




