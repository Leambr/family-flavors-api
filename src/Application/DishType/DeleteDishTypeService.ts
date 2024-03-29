import DishTypeRepository from '../../Infrastructure/Repository/DishTypeRepository/DishTypeRepository';

export default class DeleteDishTypeService {
    constructor(private readonly dishTypeRepository: DishTypeRepository) {}

    public async deleteDishType(id: number) {
        const isIdMissing = !id;
        if (isIdMissing) {
            throw new Error('ID is required.');
        }

        return await this.dishTypeRepository.delete(id).then((dishTypePacket) => {
            return dishTypePacket[0];
        });
    }
}
