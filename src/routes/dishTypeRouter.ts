import { Router } from 'express';
import DishTypeController from '../UserInterface/DishTypeController/DishTypeController';
import DishTypeRepository from '../Infrastructure/DishTypeRepository/DishTypeRepository';
import CreateDishTypeService from '../Application/DishType/CreateDishTypeService';
import FindAllDishTypeService from '../Application/DishType/FindAllDishTypeService';

export default class DishTypeRouter {
    constructor(
        private dishTypeRepository = new DishTypeRepository(),
        private createDishTypeService = new CreateDishTypeService(dishTypeRepository),
        private findAllDishTypeService = new FindAllDishTypeService(dishTypeRepository),
        private dishTypeController = new DishTypeController(
            createDishTypeService,
            findAllDishTypeService
        )
    ) {}

    public routes() {
        const router = Router();
        const controller = this.dishTypeController;

        router.route('/').post((req, res) => controller.createDishType(req, res));
        router.route('/').get((req, res) => controller.findAllDishType(req, res));

        return router;
    }
}
