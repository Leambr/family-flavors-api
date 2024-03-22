import SeasonRepository from '../../Infrastructure/SeasonRepository/SeasonRepository';

export default class FindAllSeasonService {
    constructor(private readonly seasonRepository: SeasonRepository) {}

    public async findAllSeason() {
        return await this.seasonRepository.findAll();
    }
}
