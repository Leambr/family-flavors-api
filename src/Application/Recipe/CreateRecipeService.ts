import { Recipe } from '../../Domain/models';
import RecipeRepository from '../../Infrastructure/RecipeRepository/RecipeRepository';
import FindDishTypeByIdService from '../DishType/FindDishTypeByIdService';
import FindSeasonByIdService from '../Season/FindSeasonByIdService';
import { RecipeBody } from './recipe.interface';

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

        const season = await this.findSeasonByIdService.findById(recipe.seasonId);
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
                title: newRecipe.getTitle(),
                dietType: newRecipe.getDietType(),
                serving: newRecipe.getServing(),
                prepTime: newRecipe.getPrepTime(),
                cookTime: newRecipe.getCookTime(),
                instruction: newRecipe.getInstruction(),
                imageUrl: newRecipe.getImageUrl(),
                season: newRecipe.getSeasonId(),
                dishType: newRecipe.getDishTypeId(),
            };
        });
    }
}
