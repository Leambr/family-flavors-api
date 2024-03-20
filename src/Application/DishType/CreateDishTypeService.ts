import { DishType } from '../../Domain/models';
import DishTypeRepository from '../../Infrastructure/DishTypeRepository/DishTypeRepository';
import { DishTypeBody } from './dishType.interface';

export default class CreateDishTypeService {
    constructor(private readonly dishTypeRepository: DishTypeRepository) {}

    public async createDishType(disthType: DishTypeBody) {
        const isFieldsMissing = !disthType.name;

        if (isFieldsMissing) {
            throw new Error('All fields are required.');
        }

        const newDishType = new DishType(null, disthType.name);

        return await this.dishTypeRepository.create(newDishType).then((dishTypePacket) => {
            return {
                id: parseInt(dishTypePacket.insertId),
                name: newDishType.getName(),
            };
        });
    }
}
