import * as model from '../utils/constants/modelsConstants.js';
import * as table from '../utils/constants/tablesConstants.js';
import * as GlobalService from './GlobalService.js';

export const recipeService = {
    getAllRecipes: async () => {
        try {
            const query = `SELECT * FROM ${table.recipes}`;
            const result = await GlobalService.getAll(query, model.recipeModel);
            return result;
        } catch (error) {
            throw error;
        }
    },

    getRecipeById: async (id) => {
        try {
            const query = `SELECT * FROM ${table.recipes} WHERE id = ?`;
            const result = await GlobalService.getById(query, model.recipeModel, id);
            return result;
        } catch (error) {
            throw error;
        }
    },

    createRecipe: async (recipe) => {
        try {
            const query = `INSERT INTO ${table.recipes} (title,
                category,
                diet_type,
                serving,
                prep_time,
                cook_time,
                method,
                image_url) VALUES (${recipe.title}, ${recipe.category}, ${recipe.diet_type}, ${recipe.serving}, ${recipe.prep_time}, ${recipe.cook_time}, ${recipe.method}, ${recipe.image_url})`;

            const result = await GlobalService.create(
                query,
                model.recipeModel,
                recipe,
                table.recipes
            );
            return result;
        } catch (error) {
            throw error;
        }
    },
};
