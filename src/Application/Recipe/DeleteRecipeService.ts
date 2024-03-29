import RecipeRepository from '../../Infrastructure/Repository/RecipeRepository/RecipeRepository';

export default class DeleteRecipeService {
    constructor(private recipeRepository: RecipeRepository) {}

    public async deleteRecipe(id: number) {
        const isIdMissing = !id;
        if (isIdMissing) {
            throw new Error('ID is required.');
        }

        return await this.recipeRepository.delete(id).then((recipePacket) => {
            return recipePacket[0];
        });
    }
}
