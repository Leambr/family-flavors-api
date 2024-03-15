import { RowDataPacket } from 'mysql2';
import { Season } from '../../Domain/models';
import dbPool from '../../config/databaseConfig';
import SeasonQueries from './queries';
//  repo --> que les queries, logique de là ou pas là dans le service

export default class SeasonRepository {
    constructor(private queries = new SeasonQueries()) {}

    public async create(season: Season) {
        const connect = await dbPool.getConnection();
        const sql = this.queries.create;

        try {
            return await connect.query(sql, [
                season.getName(),
                season.getStartDate(),
                season.getEndDate(),
            ]);
        } catch (error) {
            throw new Error('There was an error querying table: Season -->' + error);
        } finally {
            connect.release();
        }
    }

    public async findById(id: number) {
        const connect = await dbPool.getConnection();
        const sql = this.queries.findById;

        try {
            return await connect.query(sql, id);
        } catch (error) {
            throw new Error('There was an error querying table: Season -->' + error);
        } finally {
            connect.release();
        }
    }
}