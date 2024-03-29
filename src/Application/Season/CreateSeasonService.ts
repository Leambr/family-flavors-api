import { Season } from '../../Domain/models';
import SeasonRepository from '../../Infrastructure/Repository/SeasonRepository/SeasonRepository';

import { SeasonBody } from '../../shared/types/season.interface';

export default class CreateSeasonService {
    constructor(private readonly seasonRepository: SeasonRepository) {}

    public async createSeason(season: SeasonBody) {
        const isFieldsMissing = !season.name || !season.startDate || !season.endDate;

        if (isFieldsMissing) {
            throw new Error('All fields are required.');
        }

        const newSeason = new Season(null, season.name, season.startDate, season.endDate);

        return await this.seasonRepository.create(newSeason).then((seasonPacket) => {
            return {
                id: parseInt(seasonPacket.insertId),
                name: newSeason.getName(),
                startDate: newSeason.getStartDate(),
                endDate: newSeason.getEndDate(),
            };
        });
    }
}
