import UserRepository from '../../Infrastructure/Repository/UserRepository/UserRepository';

export default class FindAllUserService {
    constructor(private readonly userRepository: UserRepository) {}

    public async findAllUser() {
        return await this.userRepository.findAll();
    }
}
