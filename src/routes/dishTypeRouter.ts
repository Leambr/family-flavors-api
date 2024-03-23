import { Router } from 'express';

import CreateDishTypeService from '../Application/DishType/CreateDishTypeService';
import DeleteDishTypeService from '../Application/DishType/DeleteDishTypeService';
import FindAllDishTypeService from '../Application/DishType/FindAllDishTypeService';
import FindDishTypeByIdService from '../Application/DishType/FindDishTypeByIdService';
import UpdateDishTypeService from '../Application/DishType/UpdateDishTypeService';
import DishTypeRepository from '../Infrastructure/DishTypeRepository/DishTypeRepository';
import DishTypeController from '../UserInterface/DishTypeController/DishTypeController';

export default class DishTypeRouter {
    constructor(
        private dishTypeRepository = new DishTypeRepository(),
        private createDishTypeService = new CreateDishTypeService(dishTypeRepository),
        private findDishTypeByIdService = new FindDishTypeByIdService(dishTypeRepository),
        private findAllDishTypeService = new FindAllDishTypeService(dishTypeRepository),
        private updateDishTypeService = new UpdateDishTypeService(
            dishTypeRepository,
            findDishTypeByIdService
        ),
        private deleteDishTypeService = new DeleteDishTypeService(dishTypeRepository),
        private dishTypeController = new DishTypeController(
            createDishTypeService,
            findDishTypeByIdService,
            findAllDishTypeService,
            updateDishTypeService,
            deleteDishTypeService
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
         * /api/dishtype:
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
         * /api/dishtype/{id}:
         *   get:
         *     tags:
         *      - DishType
         *     summary: Retrieve dish type by ID
         *     parameters:
         *      - name: id
         *        in: path
         *        required: true
         *        schema:
         *          type: string
         *     responses:
         *      200:
         *          description: Retrieve dish type by ID
         */
        router.route('/:id').get((req, res) => controller.findDishTypeById(req, res));

        /**
         * @swagger
         * /api/dishtype:
         *   get:
         *     tags:
         *      - DishType
         *     summary: Retrieve a list of dish types
         *     responses:
         *      200:
         *          description: Retrieve list of dish types
         */
        router.route('/').get((req, res) => controller.findAllDishType(req, res));

        /**
         * @swagger
         * /api/dishtype/{id}:
         *   put:
         *     tags:
         *      - DishType
         *     summary: Update dish type by ID
         *     parameters:
         *      - name: id
         *        in: path
         *        required: true
         *        schema:
         *          type: string
         *     requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      $ref: '#/components/schemas/DishType'
         *
         *     responses:
         *      200:
         *          description: Dish type updated
         */
        router.route('/:id').put((req, res) => controller.updateDishType(req, res));

        /**
         * @swagger
         * /api/dishtype/{id}:
         *   delete:
         *     tags:
         *      - DishType
         *     summary: Delete dish type by ID
         *     parameters:
         *      - name: id
         *        in: path
         *        required: true
         *        schema:
         *          type: string
         *     responses:
         *      200:
         *          description: Dish type deleted
         */
        router.route('/:id').delete((req, res) => controller.deleteDishType(req, res));

        return router;
    }
}
