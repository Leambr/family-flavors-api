import RecipeRepository from '../../Infrastructure/RecipeRepository/RecipeRepository';

export default class FindAllRecipeService {
    constructor(private readonly recipeRepository: RecipeRepository) {}

    public async findAllRecipe() {
        return await this.recipeRepository.findAll();
    }
}
