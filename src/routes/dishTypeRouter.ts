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

    /**
     * @swagger
     * components:
     *   schemas:
     *     DishType:
     *       type: object
     *       required:
     *         - name
     *       properties:
     *         id:
     *           type: number
     *           description: The auto-generated id of the recipe
     *         name:
     *           type: string
     *           description: The name of the dish type
     *         recipes:
     *           type: array
     *           items:
     *             $ref: '#/components/schemas/Recipe'
     */

    /**
     * @swagger
     * tags:
     *   - name: DishType
     *     description: APIs related to dishType model
     */

    public routes() {
        const router = Router();
        const controller = this.dishTypeController;

        /**
         * @swagger
         * /api/dishType:
         *   post:
         *     tags:
         *      - DishType
         *     produces:
         *      - application/json
         *     summary: Add new dish type
         *     requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      properties:
         *                          name:
         *                              type: string
         *     responses:
         *      200:
         *          description: new DishType added
         */
        router.route('/').post((req, res) => controller.createDishType(req, res));

        /**
         * @swagger
         * /api/dishType:
         *   get:
         *     tags:
         *      - DishType
         *     summary: Retrieve a list of dish types
         *     responses:
         *      200:
         *          description: Retrieve list of dish types
         */
        router.route('/').get((req, res) => controller.findAllDishType(req, res));

        return router;
    }
}
