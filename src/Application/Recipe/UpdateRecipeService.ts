import { Recipe } from '../../Domain/models';
import RecipeRepository from '../../Infrastructure/RecipeRepository/RecipeRepository';

import FindRecipeByIdService from './FindRecipeByIdService';
import { RecipeBody } from './recipe.interface';

export default class UpdateRecipeService {
    constructor(
        private readonly recipeRepository: RecipeRepository,
        private readonly findRecipeByIdService: FindRecipeByIdService
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
                id: updatedRecipe.getId(),
                title: updatedRecipe.getTitle(),
                dietType: updatedRecipe.getDietType(),
                serving: updatedRecipe.getServing(),
                prepTime: updatedRecipe.getPrepTime(),
                cookTime: updatedRecipe.getCookTime(),
                instruction: updatedRecipe.getInstruction(),
                imageUrl: updatedRecipe.getImageUrl(),
                seasonId: updatedRecipe.getSeasonId(),
                dishTypeId: updatedRecipe.getDishTypeId(),
            };
        });
    }
}
