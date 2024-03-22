import { Request, Response } from 'express';
import CreateSeasonService from '../../Application/Season/CreateSeasonService';
import DeleteSeasonService from '../../Application/Season/DeleteSeasonService';
import FindAllSeasonService from '../../Application/Season/FindAllSeasonService';
import FindSeasonByIdService from '../../Application/Season/FindSeasonByIdService';
import UpdateSeasonService from '../../Application/Season/UpdateSeasonService';
import { getErrorMessage } from '../../utils/helper/errorMessage';

export default class SeasonController {
    private createSeasonService: CreateSeasonService;
    private findSeasonByIdService: FindSeasonByIdService;
    private findAllSeasonService: FindAllSeasonService;
    private updateSeasonService: UpdateSeasonService;
    private deleteSeasonService: DeleteSeasonService;

    constructor(
        createSeasonService: CreateSeasonService,
        findSeasonByIdService: FindSeasonByIdService,
        findAllSeasonService: FindAllSeasonService,
        updateSeasonService: UpdateSeasonService,
        deleteSeasonService: DeleteSeasonService
    ) {
        this.createSeasonService = createSeasonService;
        this.findSeasonByIdService = findSeasonByIdService;
        this.findAllSeasonService = findAllSeasonService;
        this.updateSeasonService = updateSeasonService;
        this.deleteSeasonService = deleteSeasonService;
    }

    public async createSeason(req: Request, res: Response): Promise<Response> {
        try {
            const { name, startDate, endDate } = req.body;
            const season = await this.createSeasonService.createSeason({
                name,
                startDate,
                endDate,
            });

            return res.json(season);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }

    public async findSeasonById(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const season = await this.findSeasonByIdService.findSeasonById(id);

            return res.json(season);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }

    public async findAllSeason(_: Request, res: Response): Promise<Response> {
        try {
            const season = await this.findAllSeasonService.findAllSeason();

            return res.json(season);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }

    public async updateSeason(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const updatedSeason = req.body;
            const season = await this.updateSeasonService.updateSeason(id, updatedSeason);

            return res.json(season);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }

    public async deleteSeason(req: Request, res: Response): Promise<Response> {
        try {
            const id = parseInt(req.params.id);
            const season = await this.deleteSeasonService.deleteSeason(id);

            return res.json(season);
        } catch (error) {
            const { status, body } = getErrorMessage(error);

            return res.status(status).json(body);
        }
    }
}
