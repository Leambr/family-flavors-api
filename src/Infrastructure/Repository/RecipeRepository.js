import * as model from '../../utils/constants/modelsConstants.js';
import * as table from '../../utils/constants/tablesConstants.js';
import * as GlobalService from './GlobalRepository.js';

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
                diet_type,
                serving,
                prep_time,
                cook_time,
                instruction,
                image_url, season) VALUES (${recipe.title}, ${recipe.diet_type}, ${recipe.serving}, ${recipe.prep_time}, ${recipe.cook_time}, ${recipe.instruction}, ${recipe.image_url}, ${recipe.season})`;

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
            diet_type = ?,
            serving = ?,
            prep_time = ?,
            cook_time = ?,
            method = ?,
            image_url = ?, 
            season = ?
        WHERE id = ?`;

            const { title, diet_type, serving, prep_time, cook_time, method, image_url, season } =
                updatedRecipeData;

            const result = await GlobalService.editById(
                query,
                model.recipeModel,
                [id, title, diet_type, serving, prep_time, cook_time, method, image_url, season],
                table.recipes,
                id
            );

            console.log('SQL Query:', query);
            console.log('Parameters:', [
                title,
                diet_type,
                serving,
                prep_time,
                cook_time,
                instruction,
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
