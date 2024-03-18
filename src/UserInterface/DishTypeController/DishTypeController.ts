import { Request, Response } from 'express';
import CreateDishTypeService from '../../Application/DishType/CreateDishTypeService';
import FindAllDishTypeService from '../../Application/DishType/FindAllDishTypeService';
import FindDishTypeByIdService from '../../Application/DishType/FindDishTypeByIdService';

export default class DishTypeController {
    private createDishTypeService: CreateDishTypeService;
    private findDishTypeByIdService: FindDishTypeByIdService;
    private findAllDishTypeService: FindAllDishTypeService;

    constructor(
        createDishTypeService: CreateDishTypeService,
        findDishTypeByIdService: FindDishTypeByIdService,
        findAllDishTypeService: FindAllDishTypeService
    ) {
        this.createDishTypeService = createDishTypeService;
        this.findDishTypeByIdService = findDishTypeByIdService;
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

    public async findDishTypeById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const dishType = await this.findDishTypeByIdService.findDishTypeById(id);

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
