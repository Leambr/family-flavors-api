import { dbPool } from '../config/databaseConfig.js';
import * as table from '../utils/constants/tablesConstants.js';
import * as model from '../utils/constants/modelsConstants.js';
import * as GlobalService from './GlobalService.js';

export const recipeService = {
    getAllRecipes: async () => {
        try {
            console.log('getAllRecipes');
            const query = `SELECT * FROM ${table.recipes}`;
            const result = await GlobalService.getAll(query, model.recipeModel);
            return result;
        } catch (error) {
            throw error;
        }
    },
};
