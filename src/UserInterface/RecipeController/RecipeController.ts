import { Request, Response } from 'express';
import CreateRecipeService from '../../Application/Recipe/CreateRecipeService';
import FindAllRecipeService from '../../Application/Recipe/FindAllRecipeService';

export default class RecipeController {
    private createRecipeService: CreateRecipeService;
    private findAllRecipeService: FindAllRecipeService;

    constructor(
        createRecipeService: CreateRecipeService,
        findAllRecipeService: FindAllRecipeService
    ) {
        this.createRecipeService = createRecipeService;
        this.findAllRecipeService = findAllRecipeService;
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

    public async findAllRecipe(_: any, res: Response): Promise<Response> {
        try {
            const recipe = await this.findAllRecipeService.findAllRecipe();

            return res.json(recipe);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
