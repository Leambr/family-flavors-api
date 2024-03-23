import { Router } from 'express';

import CreateSeasonService from '../Application/Season/CreateSeasonService';
import DeleteSeasonService from '../Application/Season/DeleteSeasonService';
import FindAllSeasonService from '../Application/Season/FindAllSeasonService';
import FindSeasonByIdService from '../Application/Season/FindSeasonByIdService';
import UpdateSeasonService from '../Application/Season/UpdateSeasonService';
import SeasonRepository from '../Infrastructure/SeasonRepository/SeasonRepository';
import SeasonController from '../UserInterface/SeasonController/SeasonController';

export default class SeasonRouter {
    constructor(
        //Repository
        private seasonRepository = new SeasonRepository(),

        // Service
        private findSeasonByIdService = new FindSeasonByIdService(seasonRepository),
        private findAllSeasonService = new FindAllSeasonService(seasonRepository),
        private updateSeasonService = new UpdateSeasonService(
            seasonRepository,
            findSeasonByIdService
        ),
        private deleteSeasonService = new DeleteSeasonService(seasonRepository),
        private createSeasonService = new CreateSeasonService(seasonRepository),

        // Controller
        private seasonController = new SeasonController(
            createSeasonService,
            findSeasonByIdService,
            findAllSeasonService,
            updateSeasonService,
            deleteSeasonService
        )
    ) {}

    /**
     * @swagger
     * components:
     *   schemas:
     *     Season:
     *       type: object
     *       required:
     *         - name
     *         - startDate
     *         - endDate
     */

    public routes() {
        const router = Router();
        const controller = this.seasonController;

        router.route('/').post((req, res) => controller.createSeason(req, res));
        router.route('/').get((req, res) => controller.findAllSeason(req, res));
        router.route('/:id').get((req, res) => controller.findSeasonById(req, res));
        router.route('/:id').put((req, res) => controller.updateSeason(req, res));
        router.route('/:id').delete((req, res) => controller.deleteSeason(req, res));

        return router;
    }
}
