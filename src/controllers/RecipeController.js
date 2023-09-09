import { recipeService } from '../services/RecipeService.js';
import * as responseFormatter from '../utils/helper/responseFormatter.js';

export const recipeController = {
    getAllRecipes: async (_, res) => {
        try {
            const recipes = await recipeService.getAllRecipes();
            const response = responseFormatter.formatResponse(res.statusCode, recipes);
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
