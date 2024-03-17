import { Router } from 'express';
import RecipeRepository from '../Infrastructure/RecipeRepository/RecipeRepository';
import CreateRecipeService from '../Application/Recipe/CreateRecipeService';
import DishTypeRepository from '../Infrastructure/DishTypeRepository/DishTypeRepository';
import SeasonRepository from '../Infrastructure/SeasonRepository/SeasonRepository';
import RecipeController from '../UserInterface/RecipeController/RecipeController';
import FindSeasonByIdService from '../Application/Season/FindSeasonByIdService';
import FindDishTypeByIdService from '../Application/DishType/FindDishTypeByIdService';

export default class RecipeRouter {
    constructor(
        private recipeRepository = new RecipeRepository(),
        private dishTypeRepository = new DishTypeRepository(),
        private seasonRepository = new SeasonRepository(),
        private findSeasonByIdService = new FindSeasonByIdService(seasonRepository),
        private findDishTypeByIdService = new FindDishTypeByIdService(dishTypeRepository),
        private createRecipeService = new CreateRecipeService(
            recipeRepository,
            findDishTypeByIdService,
            findSeasonByIdService
        ),
        private recipeController = new RecipeController(createRecipeService)
    ) {}

    public routes() {
        const router = Router();
        const controller = this.recipeController;

        router.route('/').post((req, res) => controller.createRecipe(req, res));
        // router.route('/').get((req, res) => controller.findAllRecipe(req, res));
        return router;
    }
}
