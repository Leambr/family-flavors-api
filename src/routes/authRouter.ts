import { Router } from 'express';

import AuthController from '../UserInterface/AuthController/AuthController';

export default class AuthRouter {
    constructor(private controller = new AuthController()) {}

    public routes() {
        const router = Router();
        const controller = this.controller;

        router.route('/').post(controller.auth);

        return router;
    }
}
