import { Router } from 'express';
import RecipeRepository from '../Infrastructure/RecipeRepository/RecipeRepository';
import CreateRecipeService from '../Application/Recipe/CreateRecipeService';
import DishTypeRepository from '../Infrastructure/DishTypeRepository/DishTypeRepository';
import SeasonRepository from '../Infrastructure/SeasonRepository/SeasonRepository';
import RecipeController from '../UserInterface/RecipeController/RecipeController';
import FindSeasonByIdService from '../Application/Season/FindSeasonByIdService';
import FindDishTypeByIdService from '../Application/DishType/FindDishTypeByIdService';
import FindAllRecipeService from '../Application/Recipe/FindAllRecipeService';
import FindRecipeByIdService from '../Application/Recipe/FindRecipeByIdService';
import UpdateRecipeService from '../Application/Recipe/UpdateRecipeService';
import DeleteRecipeService from '../Application/Recipe/DeleteRecipeService';
import { FindRecipeByDishTypeId } from '../Application/Recipe/FindRecipeByDishTypeIdService';

export default class RecipeRouter {
    constructor(
        //Repository
        private recipeRepository = new RecipeRepository(),
        private dishTypeRepository = new DishTypeRepository(),
        private seasonRepository = new SeasonRepository(),

        // Service
        private findRecipeByIdService = new FindRecipeByIdService(recipeRepository),
        private findAllRecipeService = new FindAllRecipeService(recipeRepository),
        private updateRecipeService = new UpdateRecipeService(
            recipeRepository,
            findRecipeByIdService
        ),
        private deleteRecipeService = new DeleteRecipeService(recipeRepository),
        private findRecipeByDishTypeIdService = new FindRecipeByDishTypeId(recipeRepository),
        private findSeasonByIdService = new FindSeasonByIdService(seasonRepository),
        private findDishTypeByIdService = new FindDishTypeByIdService(dishTypeRepository),
        private createRecipeService = new CreateRecipeService(
            recipeRepository,
            findDishTypeByIdService,
            findSeasonByIdService
        ),

        // Controller
        private recipeController = new RecipeController(
            createRecipeService,
            findRecipeByIdService,
            findAllRecipeService,
            updateRecipeService,
            deleteRecipeService,
            findRecipeByDishTypeIdService
        )
    ) {}

    /**
     * @swagger
     * components:
     *   schemas:
     *     Recipe:
     *       type: object
     *       required:
     *         - title
     *         - dietType
     *         - serving
     *         - prepTime
     *         - cookTime
     *         - instruction
     *         - imageUrl
     *         - seasonId
     *         - dishTypeId
     *       properties:
     *         id:
     *           type: number
     *           description: The auto-generated id of the recipe
     *         title:
     *           type: string
     *           description: The name of your recipe
     *         dietType:
     *           type: string
     *           description: The diet type of your recipe
     *         serving:
     *           type: number
     *           description: The number of serving of your recipe
     *         prepTime:
     *           type: number
     *           description: The preparation time of your recipe
     *         cookTime:
     *           type: number
     *           description: The cooking time of your recipe
     *         instruction:
     *           type: string
     *           description: The instructions to prepare your recipe
     *         imageUrl:
     *           type: string
     *           description: The picture of your recipe
     *         seasonId:
     *           type: number
     *           description: The reference to the season of your recipe
     *         dishTypeId:
     *           type: number
     *           description: The reference to the dish type of your recipe
     *
     *
     */

    /**
     * @swagger
     * tags:
     *   - name: Recipe
     *     description: APIs related to recipe model
     */

    public routes() {
        const router = Router();
        const controller = this.recipeController;

        /**
         * @swagger
         * /api/recipe:
         *   post:
         *     tags:
         *      - Recipe
         *     produces:
         *      - application/json
         *     summary: Add new recipe
         *     requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      $ref: '#/components/schemas/Recipe'
         *
         *     responses:
         *      200:
         *          description: new Recipe added
         */
        router.route('/').post((req, res) => controller.createRecipe(req, res));

        /**
         * @swagger
         * /api/recipe:
         *   get:
         *     tags:
         *      - Recipe
         *     summary: Retrieve a list of recipes
         *     responses:
         *      200:
         *          description: Retrieve list of recipes
         */
        router.route('/').get((req, res) => controller.findAllRecipe(req, res));

        /**
         * @swagger
         * /api/recipe/{id}:
         *   get:
         *     tags:
         *      - Recipe
         *     summary: Retrieve recipe by ID
         *     parameters:
         *      - name: id
         *        in: path
         *        required: true
         *        schema:
         *          type: string
         *     responses:
         *      200:
         *          description: Retrieve recipe
         */
        router.route('/:id').get((req, res) => controller.findRecipeById(req, res));

        /**
         * @swagger
         * /api/recipe/{id}:
         *   put:
         *     tags:
         *      - Recipe
         *     summary: Update recipe by ID
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
         *                      $ref: '#/components/schemas/Recipe'
         *
         *     responses:
         *      200:
         *          description: Recipe updated
         */
        router.route('/:id').put((req, res) => controller.updateRecipe(req, res));

        /**
         * @swagger
         * /api/recipe/{id}:
         *   delete:
         *     tags:
         *      - Recipe
         *     summary: Delete recipe by ID
         *     parameters:
         *      - name: id
         *        in: path
         *        required: true
         *        schema:
         *          type: string
         *     responses:
         *      200:
         *          description: Recipe deleted
         */
        router.route('/:id').delete((req, res) => controller.deleteRecipe(req, res));

        /**
         * @swagger
         * /api/recipe/dish/{dishTypeId}:
         *   get:
         *     tags:
         *      - Recipe
         *     summary: Retrieve recipe by dish type
         *     parameters:
         *      - name: dishTypeId
         *        in: path
         *        required: true
         *        schema:
         *          type: string
         *     responses:
         *      200:
         *          description: Retrieve recipe by dish type
         */
        router
            .route('/dish/:dishTypeId')
            .get((req, res) => controller.findRecipeByDishTypeId(req, res));

        return router;
    }
}
