import UserRepository from '../../Infrastructure/Repository/UserRepository/UserRepository';
import { Credentials } from '../../shared/types/credentials.interface';
import Authenticator from '../../UserInterface/Security/services/Authenticator';

export default class AuthenticateService {
    constructor(
        private userRepository = new UserRepository(),
        private authenticator = new Authenticator()
    ) {}

    public async authenticate(credentials: Credentials) {
        if (!credentials.email || !credentials.password) {
            throw new Error('All fields are required.');
        }

        return await this.userRepository.findByEmail(credentials.email).then((user) => {
            if (!user.length) {
                throw new Error('User not found');
            }

            console.log('credentials', credentials);
            console.log('user', user[0]);

            const isPasswordValid = this.authenticator.comparePassword(
                credentials.password,
                user[0].password
            );

            if (!isPasswordValid) {
                throw new Error('Invalid email or password');
            }

            const payload = {
                id: user[0].id,
                email: user[0].email,
                roles: user[0].roles,
            };

            return this.authenticator.generateToken(payload);
        });
    }
}
