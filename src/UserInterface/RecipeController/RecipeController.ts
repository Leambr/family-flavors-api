import { Request, Response } from 'express';

import CreateRecipeService from '../../Application/Recipe/CreateRecipeService';
import DeleteRecipeService from '../../Application/Recipe/DeleteRecipeService';
import FindAllRecipeService from '../../Application/Recipe/FindAllRecipeService';
import { FindRecipeByDishTypeId } from '../../Application/Recipe/FindRecipeByDishTypeIdService';
import FindRecipeByIdService from '../../Application/Recipe/FindRecipeByIdService';
import UpdateRecipeService from '../../Application/Recipe/UpdateRecipeService';
import { getErrorMessage } from '../shared/utils/errorMessage';

export default class RecipeController {
    private createRecipeService: CreateRecipeService;
    private findRecipeByIdService: FindRecipeByIdService;
    private findAllRecipeService: FindAllRecipeService;
    private updateRecipeService: UpdateRecipeService;
    private deleteRecipeService: DeleteRecipeService;
    private findRecipeByDishTypeIdService: FindRecipeByDishTypeId;

    constructor(
        createRecipeService: CreateRecipeService,
        findRecipeByIdService: FindRecipeByIdService,
        findAllRecipeService: FindAllRecipeService,
        updateRecipeService: UpdateRecipeService,
        deleteRecipeService: DeleteRecipeService,
        findRecipeByDishTypeIdService: FindRecipeByDishTypeId
    ) {
        this.createRecipeService = createRecipeService;
        this.findRecipeByIdService = findRecipeByIdService;
        this.findAllRecipeService = findAllRecipeService;
        this.updateRecipeService = updateRecipeService;
        this.deleteRecipeService = deleteRecipeService;
        this.findRecipeByDishTypeIdService = findRecipeByDishTypeIdService;
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
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }

    public async findRecipeById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const recipe = await this.findRecipeByIdService.findRecipeById(id);

            return res.json(recipe);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }

    public async findAllRecipe(_: Request, res: Response): Promise<Response> {
        try {
            const recipe = await this.findAllRecipeService.findAllRecipe();

            return res.json(recipe);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }

    public async updateRecipe(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const updatedRecipeData = req.body;

            const recipe = await this.updateRecipeService.updateRecipe(id, updatedRecipeData);

            return res.json(recipe);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }

    public async deleteRecipe(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const recipe = await this.deleteRecipeService.deleteRecipe(id);

            return res.json(recipe);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }

    public async findRecipeByDishTypeId(req: Request, res: Response): Promise<Response> {
        try {
            const dishTypeId = parseInt(req.params.dishTypeId);
            const recipe =
                await this.findRecipeByDishTypeIdService.findRecipeByDishTypeId(dishTypeId);

            return res.json(recipe);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }
}
