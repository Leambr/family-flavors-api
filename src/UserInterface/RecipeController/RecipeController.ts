import { Request, Response } from 'express';
import CreateRecipeService from '../../Application/Recipe/CreateRecipeService';

export default class RecipeController {
    private createRecipeService: CreateRecipeService;

    constructor(createRecipeService: CreateRecipeService) {
        this.createRecipeService = createRecipeService;
    }

    public async createRecipe(req: Request, res: Response): Promise<Response> {
        try {
            const {
                title,
                dietType,
                serving,
                prepTime,
                cookTime,
                instruction,
                imageUrl,
                seasonId,
                dishTypeId,
            } = req.body;

            const recipe = await this.createRecipeService.createRecipe({
                title,
                dietType,
                serving,
                prepTime,
                cookTime,
                instruction,
                imageUrl,
                seasonId,
                dishTypeId,
            });
            return res.json(recipe);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
