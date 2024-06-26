import { DishType } from '../../Domain/models';
import DishTypeRepository from '../../Infrastructure/Repository/DishTypeRepository/DishTypeRepository';

import { DishTypeBody } from '../../shared/types/dishType.interface';

import FindDishTypeByIdService from './FindDishTypeByIdService';

export default class UpdateDishTypeService {
    constructor(
        private readonly dishTypeRepository: DishTypeRepository,
        private readonly findDishTypeByIdService: FindDishTypeByIdService
    ) {}

    public async updateDishType(id: number, dishTypeData: DishTypeBody) {
        const dishType = await this.findDishTypeByIdService.findDishTypeById(id);
        if (!dishType) {
            throw new Error('Dish type not found.');
        }

        const fieldsToUpdate = Object.keys(dishTypeData);
        fieldsToUpdate.forEach((field) => {
            if (dishTypeData[field as keyof DishTypeBody] !== undefined) {
                dishType[field as keyof DishTypeBody] = dishTypeData[field as keyof DishTypeBody];
            }
        });

        const updatedDishType = new DishType(dishType.id, dishType.name);

        return await this.dishTypeRepository.update(id, updatedDishType).then(() => {
            return {
                id: updatedDishType.id,
                name: updatedDishType.name,
            };
        });
    }
}
