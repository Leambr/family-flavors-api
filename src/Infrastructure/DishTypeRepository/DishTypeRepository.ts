import dbPool from '../../config/databaseConfig';
import { DishType } from '../../Domain/models';

import DishTypeQueries from './queries';

export default class DishTypeRepository {
    constructor(private queries = new DishTypeQueries()) {}

    public async create(dishType: DishType) {
        const connect = await dbPool.getConnection();
        const sql = this.queries.create;

        try {
            return await connect.query(sql, [dishType.getName()]);
        } catch (error) {
            throw new Error('There was an error querying table: DishType -->' + error);
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
            throw new Error('There was an error querying table: DishType -->' + error);
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

    public async update(id: number, dishType: DishType) {
        const connect = await dbPool.getConnection();
        const sql = this.queries.update;

        try {
            return await connect.query(sql, [dishType.getName(), id]);
        } catch (error) {
            throw new Error('There was an error querying table: DishType -->' + error);
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
            throw new Error('There was an error querying table: DishType -->' + error);
        } finally {
            connect.release();
        }
    }
}
