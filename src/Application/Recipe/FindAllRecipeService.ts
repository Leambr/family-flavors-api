import RecipeRepository from '../../Infrastructure/Repository/RecipeRepository/RecipeRepository';

export default class FindAllRecipeService {
    constructor(private readonly recipeRepository: RecipeRepository) {}

    public async findAllRecipe() {
        return await this.recipeRepository.findAll();
    }
}
