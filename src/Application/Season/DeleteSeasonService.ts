import SeasonRepository from '../../Infrastructure/SeasonRepository/SeasonRepository';

export default class DeleteSeasonService {
    constructor(private readonly seasonRepository: SeasonRepository) {}

    public async deleteSeason(id: number) {
        const isIdMissing = !id;
        if (isIdMissing) {
            throw new Error('ID is required.');
        }

        return await this.seasonRepository.delete(id).then((seasonPacket) => {
            return seasonPacket[0];
        });
    }
}
