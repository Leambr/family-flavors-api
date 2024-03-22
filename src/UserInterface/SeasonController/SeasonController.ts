import CreateSeasonService from '../../Application/Season/CreateSeasonService';
import DeleteSeasonService from '../../Application/Season/DeleteSeasonService';
import FindAllSeasonService from '../../Application/Season/FindAllSeasonService';
import FindSeasonByIdService from '../../Application/Season/FindSeasonByIdService';
import UpdateSeasonService from '../../Application/Season/UpdateSeasonService';

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

    public async createSeason(req: any, res: any): Promise<any> {
        try {
            const { name, startDate, endDate } = req.body;
            const season = await this.createSeasonService.createSeason({
                name,
                startDate,
                endDate,
            });

            return res.json(season);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async findSeasonById(req: any, res: any): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            const season = await this.findSeasonByIdService.findSeasonById(id);

            return res.json(season);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async findAllSeason(_: any, res: any): Promise<any> {
        try {
            const season = await this.findAllSeasonService.findAllSeason();

            return res.json(season);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async updateSeason(req: any, res: any): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            const updatedSeason = req.body;
            const season = await this.updateSeasonService.updateSeason(id, updatedSeason);

            return res.json(season);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    public async deleteSeason(req: any, res: any): Promise<any> {
        try {
            const id = parseInt(req.params.id);
            const season = await this.deleteSeasonService.deleteSeason(id);

            return res.json(season);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
