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
                instructions,
                image_url) VALUES (${recipe.title}, ${recipe.category}, ${recipe.diet_type}, ${recipe.serving}, ${recipe.prep_time}, ${recipe.cook_time}, ${recipe.instructions}, ${recipe.image_url})`;

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

    editRecipe: async (id, updatedRecipeData) => {
        try {
            const query = `UPDATE ${table.recipes}
            SET
            title = ?,
            category = ?,
            diet_type = ?,
            serving = ?,
            prep_time = ?,
            cook_time = ?,
            method = ?,
            image_url = ?, 
            season_id = ?
        WHERE id = ?`;

            const {
                title,
                category,
                diet_type,
                serving,
                prep_time,
                cook_time,
                method,
                image_url,
                season_id,
            } = updatedRecipeData;

            const result = await GlobalService.editById(
                query,
                model.recipeModel,
                [
                    id,
                    title,
                    category,
                    diet_type,
                    serving,
                    prep_time,
                    cook_time,
                    method,
                    image_url,
                    season_id,
                ],
                table.recipes,
                id
            );

            console.log('SQL Query:', query);
            console.log('Parameters:', [
                title,
                category,
                diet_type,
                serving,
                prep_time,
                cook_time,
                instructions,
                image_url,
                id,
            ]);
            return result;
        } catch (error) {
            throw error;
        }
    },

    deleteRecipeById: async (id) => {
        try {
            const query = `DELETE FROM ${table.recipes} WHERE id = ?`;
            const result = await GlobalService.deleteById(query, id);
            return result;
        } catch (error) {
            throw error;
        }
    },
};
