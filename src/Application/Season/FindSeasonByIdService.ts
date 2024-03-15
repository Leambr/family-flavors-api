import SeasonRepository from '../../Infrastructure/SeasonRepository/SeasonRepository';

export default class FindSeasonByIdService {
    constructor(private readonly seasonRepository: SeasonRepository) {}

    public async findById(id: number) {
        const isIdMissing = !id;
        if (isIdMissing) {
            throw new Error('ID is required.');
        }
        return await this.seasonRepository.findById(id).then((seasonPacket) => {
            return seasonPacket[0];
        });
    }
}
