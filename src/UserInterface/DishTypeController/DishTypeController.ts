import { Request, Response } from 'express';

import CreateDishTypeService from '../../Application/DishType/CreateDishTypeService';
import DeleteDishTypeService from '../../Application/DishType/DeleteDishTypeService';
import FindAllDishTypeService from '../../Application/DishType/FindAllDishTypeService';
import FindDishTypeByIdService from '../../Application/DishType/FindDishTypeByIdService';
import UpdateDishTypeService from '../../Application/DishType/UpdateDishTypeService';
import { getErrorMessage } from '../../utils/helper/errorMessage';

export default class DishTypeController {
    private createDishTypeService: CreateDishTypeService;
    private findDishTypeByIdService: FindDishTypeByIdService;
    private findAllDishTypeService: FindAllDishTypeService;
    private updateDishTypeService: UpdateDishTypeService;
    private deleteDishTypeService: DeleteDishTypeService;

    constructor(
        createDishTypeService: CreateDishTypeService,
        findDishTypeByIdService: FindDishTypeByIdService,
        findAllDishTypeService: FindAllDishTypeService,
        updateDishTypeService: UpdateDishTypeService,
        deleteDishTypeService: DeleteDishTypeService
    ) {
        this.createDishTypeService = createDishTypeService;
        this.findDishTypeByIdService = findDishTypeByIdService;
        this.findAllDishTypeService = findAllDishTypeService;
        this.updateDishTypeService = updateDishTypeService;
        this.deleteDishTypeService = deleteDishTypeService;
    }

    public async createDishType(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.body;
            const dishType = await this.createDishTypeService.createDishType({ name });

            return res.json(dishType);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }

    public async findDishTypeById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const dishType = await this.findDishTypeByIdService.findDishTypeById(id);

            return res.json(dishType);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }

    public async findAllDishType(_: Request, res: Response): Promise<Response> {
        try {
            const dishType = await this.findAllDishTypeService.findAllDishType();

            return res.json(dishType);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }

    public async updateDishType(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const updatedDishType = req.body;

            const dishType = await this.updateDishTypeService.updateDishType(id, updatedDishType);

            return res.json(dishType);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }

    public async deleteDishType(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const dishType = await this.deleteDishTypeService.deleteDishType(id);

            return res.json(dishType);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }
}
