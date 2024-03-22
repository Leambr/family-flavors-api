import { Season } from '../../Domain/models';
import SeasonRepository from '../../Infrastructure/SeasonRepository/SeasonRepository';
import FindSeasonByIdService from './FindSeasonByIdService';
import { SeasonBody } from './season.interface';

export default class UpdateSeasonService {
    constructor(
        private readonly seasonRepository: SeasonRepository,
        private readonly findSeasonByIdService: FindSeasonByIdService
    ) {}

    public async updateSeason(id: number, seasonData: SeasonBody) {
        const season = await this.findSeasonByIdService.findSeasonById(id);
        if (!season) {
            throw new Error('Season not found.');
        }

        const fieldsToUpdate = Object.keys(seasonData);
        fieldsToUpdate.forEach((field) => {
            if (seasonData[field as keyof SeasonBody] !== undefined) {
                season[field as keyof SeasonBody] = seasonData[field as keyof SeasonBody];
            }
        });

        const updatedSeason = new Season(season.id, season.name, season.startDate, season.endDate);

        return await this.seasonRepository.update(id, updatedSeason).then(() => {
            return {
                id: updatedSeason.getId(),
                name: updatedSeason.getName(),
                startDate: updatedSeason.getStartDate(),
                endDate: updatedSeason.getEndDate(),
            };
        });
    }
}
