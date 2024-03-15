import { Request, Response } from 'express';
import CreateDishTypeService from '../../Application/DishType/CreateDishTypeService';
import FindAllDishTypeService from '../../Application/DishType/FindAllDishTypeService';

export default class DishTypeController {
    private createDishTypeService: CreateDishTypeService;
    private findAllDishTypeService: FindAllDishTypeService;

    constructor(
        createDishTypeService: CreateDishTypeService,
        findAllDishTypeService: FindAllDishTypeService
    ) {
        this.createDishTypeService = createDishTypeService;
        this.findAllDishTypeService = findAllDishTypeService;
    }

    public async createDishType(req: Request, res: Response): Promise<Response> {
        try {
            const { name } = req.body;
            const dishType = await this.createDishTypeService.createDishType({ name });
            return res.json(dishType);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async findAllDishType(_: any, res: Response): Promise<Response> {
        try {
            const dishType = await this.findAllDishTypeService.findAllDishType();
            return res.json(dishType);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
