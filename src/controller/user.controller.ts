import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import userModel from '../models/user.model';
import {UserNotFoundException} from '../exceptions/user.exception';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private user = userModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:userName`, authMiddleware.call, this.getUserByUserName);
    }

    private getUserByUserName = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.userName;
        const userQuery = this.user.findById(id);
        const user = await userQuery;
        if (user) {
            response.send(user);
        } else {
            next(new UserNotFoundException(id));
        }
    }
}

export default UserController;