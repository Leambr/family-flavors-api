import DishTypeRepository from '../../Infrastructure/DishTypeRepository/DishTypeRepository';

export default class FindDishTypeByIdService {
    constructor(private readonly dishTypeRepository: DishTypeRepository) {}

    public async findById(id: number) {
        const isIdMissing = !id;
        if (isIdMissing) {
            throw new Error('ID is required.');
        }

        return await this.dishTypeRepository.findById(id).then((dishTypePacket) => {
            return dishTypePacket[0];
        });
    }
}
