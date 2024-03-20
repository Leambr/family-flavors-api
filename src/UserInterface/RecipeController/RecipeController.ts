import { Request, Response } from 'express';
import CreateRecipeService from '../../Application/Recipe/CreateRecipeService';
import FindAllRecipeService from '../../Application/Recipe/FindAllRecipeService';
import FindRecipeByIdService from '../../Application/Recipe/FindRecipeByIdService';
import UpdateRecipeService from '../../Application/Recipe/UpdateRecipeService';
import DeleteRecipeService from '../../Application/Recipe/DeleteRecipeService';

export default class RecipeController {
    private createRecipeService: CreateRecipeService;
    private findRecipeByIdService: FindRecipeByIdService;
    private findAllRecipeService: FindAllRecipeService;
    private updateRecipeService: UpdateRecipeService;
    private deleteRecipeService: DeleteRecipeService;

    constructor(
        createRecipeService: CreateRecipeService,
        findRecipeByIdService: FindRecipeByIdService,
        findAllRecipeService: FindAllRecipeService,
        updateRecipeService: UpdateRecipeService,
        deleteRecipeService: DeleteRecipeService
    ) {
        this.createRecipeService = createRecipeService;
        this.findRecipeByIdService = findRecipeByIdService;
        this.findAllRecipeService = findAllRecipeService;
        this.updateRecipeService = updateRecipeService;
        this.deleteRecipeService = deleteRecipeService;
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

    public async findRecipeById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const recipe = await this.findRecipeByIdService.findRecipeById(id);

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

    public async updateRecipe(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const updatedRecipeData = req.body;

            const recipe = await this.updateRecipeService.updateRecipe(id, updatedRecipeData);
            return res.json(recipe);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async deleteRecipe(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const recipe = await this.deleteRecipeService.deleteRecipe(id);

            return res.json(recipe);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
