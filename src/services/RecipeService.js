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
};
