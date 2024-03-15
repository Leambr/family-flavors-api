import { recipeService } from '../../Infrastructure/Repository/RecipeRepository.js';
import * as responseFormatter from '../../utils/helper/responseFormatter.js';

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

    // createRecipe: async (req, res) => {
    //     try {
    //         const recipeData = req.body;

    //         const missingProps = Object.keys(recipeData).filter(
    //             (prop) => recipeData[prop] === undefined
    //         );

    //         if (missingProps.length > 0) {
    //             throw new Error(
    //                 `Données manquantes pour les propriétés : ${missingProps.join(', ')}`
    //             );
    //         }

    //         if (recipeData.imageUrl && recipeData.imageUrl.length > 255) {
    //             return res.status(400).json({ error: "L'URL est trop longue." });
    //         }

    //         const recipe = await recipeService.createRecipe(recipeData);
    //         const response = responseFormatter.formatResponse(res.statusCode, recipe);
    //         res.json(response);
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // },

    editRecipe: async (req, res) => {
        try {
            const recipeId = req.params.id;
            const updatedRecipeData = req.body;

            const existingRecipe = await recipeService.getRecipeById(recipeId);

            if (!existingRecipe) {
                return res.status(404).json({ error: "La recette n'existe pas" });
            }

            const recipe = await recipeService.editRecipe(recipeId, updatedRecipeData);
            const response = responseFormatter.formatResponse(res.statusCode, recipe);
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteRecipeById: async (req, res) => {
        try {
            const recipe = await recipeService.deleteRecipeById(req.params.id);
            const response = responseFormatter.deleteFormatResponse(res.statusCode, recipe);
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
