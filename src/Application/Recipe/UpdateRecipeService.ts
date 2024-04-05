import { Recipe } from '../../Domain/models';
import RecipeRepository from '../../Infrastructure/Repository/RecipeRepository/RecipeRepository';

import { RecipeBody } from '../../shared/types/recipe.interface';

import FindRecipeByIdService from './FindRecipeByIdService';

// Handler plutôt que service
export default class UpdateRecipeService {
    constructor(
        private readonly recipeRepository: RecipeRepository,
        private readonly findRecipeByIdService: FindRecipeByIdService // Recipefinder et le reciperepository permet d'écrire
    ) {}

    public async updateRecipe(id: number, recipeData: Partial<RecipeBody>) {
        const recipe = await this.findRecipeByIdService.findRecipeById(id);
        if (!recipe) {
            throw new Error('Recipe not found.');
        }

        const fieldsToUpdate = Object.keys(recipeData);
        fieldsToUpdate.forEach((field) => {
            if (recipeData[field as keyof RecipeBody] !== undefined) {
                recipe[field as keyof RecipeBody] = recipeData[field as keyof RecipeBody];
            }
        });

        const updatedRecipe = new Recipe(
            recipe.id,
            recipe.title,
            recipe.dietType,
            recipe.serving,
            recipe.prepTime,
            recipe.cookTime,
            recipe.instruction,
            recipe.imageUrl,
            recipe.seasonId,
            recipe.dishTypeId
        );

        return await this.recipeRepository.update(id, updatedRecipe).then(() => {
            return {
                id: updatedRecipe.id,
                title: updatedRecipe.title,
                dietType: updatedRecipe.dietType,
                serving: updatedRecipe.serving,
                prepTime: updatedRecipe.prepTime,
                cookTime: updatedRecipe.cookTime,
                instruction: updatedRecipe.instruction,
                imageUrl: updatedRecipe.imageUrl,
                seasonId: updatedRecipe.seasonId,
                dishTypeId: updatedRecipe.dishTypeId,
            };
        });
    }
}
