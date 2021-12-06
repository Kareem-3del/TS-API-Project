import HttpException from './http.exception';

class AuthenticationTokenMissingException extends HttpException {
    constructor() {
        super(401, 'Authentication token missing');
    }
}

class WrongAuthenticationTokenException extends HttpException {
    constructor() {
        super(401, 'Wrong authentication token');
    }
}
class NotAuthorizedException extends HttpException {
    constructor() {
        super(403, "You're not authorized");
    }
}
export {AuthenticationTokenMissingException , WrongAuthenticationTokenException , NotAuthorizedException};