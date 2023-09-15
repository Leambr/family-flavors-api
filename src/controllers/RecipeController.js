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

    getRecipeById: async (req, res) => {
        try {
            const recipe = await recipeService.getRecipeById(req.params.id);
            const response = responseFormatter.formatResponse(res.statusCode, recipe);
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createRecipe: async (req, res) => {
        try {
            const recipeData = req.body;

            const missingProps = Object.keys(recipeData).filter(
                (prop) => recipeData[prop] === undefined
            );

            if (missingProps.length > 0) {
                throw new Error(
                    `Données manquantes pour les propriétés : ${missingProps.join(', ')}`
                );
            }

            if (recipeData.image_url && recipeData.image_url.length > 255) {
                return res.status(400).json({ error: "L'URL est trop longue." });
            }

            const recipe = await recipeService.createRecipe(recipeData);
            const response = responseFormatter.formatResponse(res.statusCode, recipe);
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
