import DishTypeRepository from '../../Infrastructure/Repository/DishTypeRepository/DishTypeRepository';

export default class FindAllDishTypeService {
    constructor(private readonly dishTypeRepository: DishTypeRepository) {}

    public async findAllDishType() {
        return await this.dishTypeRepository.findAll();
    }
}
