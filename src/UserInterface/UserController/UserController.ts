import { Request, Response } from 'express';

import AuthenticateService from '../../Application/Authenticate/AuthenticateService';
import CreateUserService from '../../Application/User/CreateUserService';
import FindAllUserService from '../../Application/User/FindAllUserService';
import { getErrorMessage } from '../shared/utils/errorMessage';

export default class UserController {
    private createUserService: CreateUserService;
    private findAllUserService: FindAllUserService;
    private authenticateService: AuthenticateService;

    constructor(
        createUserService: CreateUserService,
        findAllUserService: FindAllUserService,
        authenticateService: AuthenticateService
    ) {
        this.createUserService = createUserService;
        this.findAllUserService = findAllUserService;
        this.authenticateService = authenticateService;
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password, firstname, lastname } = req.body;
            const user = await this.createUserService.createUser({
                email,
                password,
                firstname,
                lastname,
            });

            const token = await this.authenticateService.authenticate({ email, password });

            return res.json({ user, token });
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }

    public async findAllUser(_: Request, res: Response): Promise<Response> {
        try {
            const user = await this.findAllUserService.findAllUser();

            return res.json(user);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }
}
