import {NextFunction, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {AuthenticationTokenMissingException, WrongAuthenticationTokenException} from '../exceptions/auth.exception';
import DataStoredInToken from '../interfaces/dataStoredInToken';

import RequestWithUserInterface from '../interfaces/requestWithUser.interface';
import userModel from '../models/user.model';

async function authMiddleware(request: RequestWithUserInterface, response: Response, next: NextFunction) {
    const headers = request.headers; // GET THE Authorization IN headers
    if (headers && headers.Authorization) {
        const secret = process.env.JWT_SECRET || "Kareem-Adel-###";
        try {
            const verificationResponse = jwt.verify(headers.Authorization.toString(), secret) as DataStoredInToken;
            const id = verificationResponse._id;
            const user = await userModel.findById(id);
            if (user) {
                request.user = user;
                next();
            } else {
                next(new WrongAuthenticationTokenException());
            }
        } catch (error) {
            next(new WrongAuthenticationTokenException());
        }
    } else {
        next(new AuthenticationTokenMissingException());
    }
}

export default authMiddleware;