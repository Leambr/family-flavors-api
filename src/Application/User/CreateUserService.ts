import { User } from '../../Domain/models';
import UserRepository from '../../Infrastructure/Repository/UserRepository/UserRepository';
import { UserBody } from '../../shared/types/user.interface';
import Authenticator from '../../UserInterface/Security/services/Authenticator';

export default class CreateUserService {
    constructor(
        private userRepository: UserRepository,
        private authenticator: Authenticator
    ) {}

    public async createUser(user: UserBody) {
        const isFieldsMissing = !user.email || !user.password || !user.firstname || !user.lastname;

        if (isFieldsMissing) {
            throw new Error('All fields are required.');
        }

        const newUser = new User(
            null,
            user.email,
            this.authenticator.encryptPassword(user.password),
            user.firstname,
            user.lastname,
            ['ROLE_USER']
        );

        const userExists = await this.userRepository.findByEmail(user.email);

        if (userExists.length) {
            throw new Error('User already exists');
        }

        return await this.userRepository.create(newUser).then((userPacket) => {
            return {
                id: parseInt(userPacket.insertId),
                email: newUser.email,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
            };
        });
    }
}
