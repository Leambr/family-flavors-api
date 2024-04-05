import { Recipe } from '../../Domain/models';
import RecipeRepository from '../../Infrastructure/Repository/RecipeRepository/RecipeRepository';
import { RecipeBody } from '../../shared/types/recipe.interface';
import FindDishTypeByIdService from '../DishType/FindDishTypeByIdService';
import FindSeasonByIdService from '../Season/FindSeasonByIdService';

export default class CreateRecipeService {
    constructor(
        private readonly recipeRepository: RecipeRepository,
        private readonly findDishTypeByIdService: FindDishTypeByIdService,
        private readonly findSeasonByIdService: FindSeasonByIdService
    ) {}

    public async createRecipe(recipe: RecipeBody) {
        const isFieldsMissing =
            !recipe.title ||
            !recipe.dietType ||
            !recipe.serving ||
            !recipe.prepTime ||
            !recipe.cookTime ||
            !recipe.instruction ||
            !recipe.imageUrl ||
            !recipe.seasonId ||
            !recipe.dishTypeId;

        if (isFieldsMissing) {
            throw new Error('All fields are required.');
        }

        if (recipe.imageUrl.length > 255) {
            throw new Error('Image URL is too long.');
        }

        const season = await this.findSeasonByIdService.findSeasonById(recipe.seasonId);
        if (!season) {
            throw new Error('Season not found.');
        }

        const dishType = await this.findDishTypeByIdService.findDishTypeById(recipe.dishTypeId);
        if (!dishType) {
            throw new Error('Dish Type not found.');
        }

        const newRecipe = new Recipe(
            null,
            recipe.title,
            recipe.dietType,
            recipe.serving,
            recipe.prepTime,
            recipe.cookTime,
            recipe.instruction,
            recipe.imageUrl,
            season.id,
            dishType.id
        );

        return await this.recipeRepository.create(newRecipe).then((recipePacket) => {
            return {
                id: parseInt(recipePacket.insertId),
                title: newRecipe.title,
                dietType: newRecipe.dietType,
                serving: newRecipe.serving,
                prepTime: newRecipe.prepTime,
                cookTime: newRecipe.cookTime,
                instruction: newRecipe.instruction,
                imageUrl: newRecipe.imageUrl,
                season: newRecipe.seasonId,
                dishType: newRecipe.dishTypeId,
            };
        });
    }
}
