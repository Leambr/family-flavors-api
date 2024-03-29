import { NextFunction, Request, Response } from 'express';

import AuthenticateService from '../../Application/Authenticate/AuthenticateService';
import { Credentials } from '../../shared/types/credentials.interface';

export default class AuthController {
    constructor(private authenticateService = new AuthenticateService()) {}

    public auth(req: Request, res: Response, next: NextFunction) {
        const credentials = req.body as Credentials;

        this.authenticateService
            .authenticate(credentials)
            .then((token) => res.json(token))
            .catch((err) => next(err));
    }
}
