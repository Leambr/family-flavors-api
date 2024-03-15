import * as model from '../../utils/constants/modelsConstants.js';
import * as table from '../../utils/constants/tablesConstants.js';
import * as GlobalService from '../GlobalRepository.old.js';

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
                dietType,
                serving,
                prepTime,
                cookTime,
                instruction,
                imageUrl, season) VALUES (${recipe.title}, ${recipe.dietType}, ${recipe.serving}, ${recipe.prepTime}, ${recipe.cookTime}, ${recipe.instruction}, ${recipe.imageUrl}, ${recipe.season})`;

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
            dietType = ?,
            serving = ?,
            prepTime = ?,
            cookTime = ?,
            method = ?,
            imageUrl = ?, 
            season = ?
        WHERE id = ?`;

            const { title, dietType, serving, prepTime, cookTime, method, imageUrl, season } =
                updatedRecipeData;

            const result = await GlobalService.editById(
                query,
                model.recipeModel,
                [id, title, dietType, serving, prepTime, cookTime, method, imageUrl, season],
                table.recipes,
                id
            );

            console.log('SQL Query:', query);
            console.log('Parameters:', [
                title,
                dietType,
                serving,
                prepTime,
                cookTime,
                instruction,
                imageUrl,
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
