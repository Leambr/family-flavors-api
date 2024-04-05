import { Router } from 'express';

import AuthController from '../UserInterface/AuthController/AuthController';

export default class AuthRouter {
    constructor(private controller = new AuthController()) {}

    public routes() {
        const router = Router();
        const controller = this.controller;

        router.route('/login').post((req, res, next) => controller.auth(req, res, next));

        return router;
    }
}
