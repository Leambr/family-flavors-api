import { DishType, Recipe, Season } from '../../Domain/models';
import DishTypeRepository from '../../Infrastructure/DishTypeRepository/DishTypeRepository';
import RecipeRepository from '../../Infrastructure/RecipeRepository/RecipeRepository';
import SeasonRepository from '../../Infrastructure/SeasonRepository/SeasonRepository';
import { RecipeBody } from './recipe.interface';

export default class CreateRecipeService {
    constructor(
        private readonly recipeRepository: RecipeRepository,
        private readonly dishTypeRepository: DishTypeRepository,
        private readonly seasonRepository: SeasonRepository
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

        const seasonData = await this.seasonRepository.findById(recipe.seasonId);
        const season = seasonData[0];
        console.log('🚀 ~ CreateRecipeService ~ createRecipe ~ season:', seasonData.id);

        if (!seasonData) {
            throw new Error('Season not found.');
        }

        const dishTypeData = await this.dishTypeRepository.findById(recipe.dishTypeId);
        const dishType = dishTypeData[0];

        if (!dishTypeData) {
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

        console.log('🚀 ~ CreateRecipeService ~ createRecipe ~ newRecipe:', newRecipe);
        return await this.recipeRepository.create(newRecipe).then((recipePacket) => {
            return {
                id: parseInt(recipePacket.insertId),
                title: newRecipe.getTitle(),
                dietType: newRecipe.getDietType(),
                serving: newRecipe.getServing(),
                prepTime: newRecipe.getPrepTime(),
                cookTime: newRecipe.getCookTime(),
                instruction: newRecipe.getInstructions(),
                imageUrl: newRecipe.getImageUrl(),
                season: newRecipe.getSeasonId(),
                dishType: newRecipe.getDishTypeId(),
            };
        });
    }
}
