import RecipeRepository from '../../Infrastructure/RecipeRepository/RecipeRepository';

export default class FindRecipeByIdService {
    constructor(private readonly recipeRepository: RecipeRepository) {}

    public async findRecipeById(id: number) {
        const isIdMissing = !id;
        if (isIdMissing) {
            throw new Error('ID is required.');
        }

        return await this.recipeRepository.findById(id).then((recipePacket) => {
            return recipePacket[0];
        });
    }
}
