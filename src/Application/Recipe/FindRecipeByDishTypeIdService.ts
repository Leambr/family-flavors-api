import RecipeRepository from '../../Infrastructure/Repository/RecipeRepository/RecipeRepository';

export class FindRecipeByDishTypeId {
    constructor(private readonly recipeRepository: RecipeRepository) {}

    public async findRecipeByDishTypeId(dishTypeId: number) {
        const isIdMissing = !dishTypeId;
        if (isIdMissing) {
            throw new Error('ID is required.');
        }

        return await this.recipeRepository
            .findRecipeByDishTypeId(dishTypeId)
            .then((recipePacket) => {
                return recipePacket;
            });
    }
}
