import { Router } from 'express';

import AuthenticateService from '../Application/Authenticate/AuthenticateService';
import CreateUserService from '../Application/User/CreateUserService';
import FindAllUserService from '../Application/User/FindAllUserService';
import UserRepository from '../Infrastructure/Repository/UserRepository/UserRepository';
import authMiddleware from '../shared/middleware/authMiddleware';
import Authenticator from '../UserInterface/Security/services/Authenticator';
import UserController from '../UserInterface/UserController/UserController';

export default class UserRouter {
    constructor(
        private userRepository = new UserRepository(),
        private authenticator = new Authenticator(),
        private createUserService = new CreateUserService(userRepository, authenticator),
        private findAllUserService = new FindAllUserService(userRepository),
        private authenticateService = new AuthenticateService(userRepository),
        private userController = new UserController(
            createUserService,
            findAllUserService,
            authenticateService
        )
    ) {}

    public routes() {
        const router = Router();
        const controller = this.userController;

        router.route('/').post((req, res) => controller.createUser(req, res));
        router.route('/').get(authMiddleware, (req, res) => controller.findAllUser(req, res));

        return router;
    }
}
