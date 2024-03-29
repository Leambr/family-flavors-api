import dbPool from '../../../config/databaseConfig';
import { User } from '../../../Domain/models';

import UserQueries from './queries';

export default class UserRepository {
    constructor(private queries = new UserQueries()) {}

    public async create(user: User) {
        const connect = await dbPool.getConnection();
        const sql = this.queries.create;

        try {
            return await connect.query(sql, [
                user.getEmail(),
                user.getPassword(),
                user.getFirstname(),
                user.getLastname(),
                user.getRoles(),
            ]);
        } catch (error) {
            throw new Error('There was an error querying table: User -->' + error);
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
            throw new Error('There was an error querying table: User -->' + error);
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
            throw new Error('There was an error querying table: User -->' + error);
        } finally {
            connect.release();
        }
    }

    public async findByEmail(email: string) {
        const connect = await dbPool.getConnection();
        const sql = this.queries.findByEmail;

        try {
            return await connect.query(sql, email);
        } catch (error) {
            throw new Error('There was an error querying table: User -->' + error);
        } finally {
            connect.release();
        }
    }
}
