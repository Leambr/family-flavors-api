import dbPool from '../../../config/databaseConfig';
import { Season } from '../../../Domain/models';

import SeasonQueries from './queries';

export default class SeasonRepository {
    constructor(private queries = new SeasonQueries()) {}

    public async create(season: Season) {
        const connect = await dbPool.getConnection();
        const sql = this.queries.create;

        try {
            return await connect.query(sql, [season.name, season.startDate, season.endDate]);
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

    public async findAll() {
        const connect = await dbPool.getConnection();
        const sql = this.queries.findAll;

        try {
            return await connect.query(sql);
        } catch (error) {
            throw new Error('There was an error querying table: DishType -->' + error);
        } finally {
            connect.release();
        }
    }

    public async update(id: number, season: Season) {
        const connect = await dbPool.getConnection();
        const sql = this.queries.update;

        try {
            return await connect.query(sql, [season.name, season.startDate, season.endDate, id]);
        } catch (error) {
            throw new Error('There was an error querying table: Season -->' + error);
        } finally {
            connect.release();
        }
    }

    public async delete(id: number) {
        const connect = await dbPool.getConnection();
        const sql = this.queries.delete;

        try {
            return await connect.query(sql, id);
        } catch (error) {
            throw new Error('There was an error querying table: Season -->' + error);
        } finally {
            connect.release();
        }
    }
}
