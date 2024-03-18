import { Recipe } from '../../Domain/models';
import dbPool from '../../config/databaseConfig';
import RecipeQueries from './queries';

export default class RecipeRepository {
    constructor(private queries = new RecipeQueries()) {}

    public async create(recipe: Recipe) {
        const connect = await dbPool.getConnection();
        const sql = this.queries.create;

        try {
            return await connect.query(sql, [
                recipe.getTitle(),
                recipe.getDietType(),
                recipe.getServing(),
                recipe.getPrepTime(),
                recipe.getCookTime(),
                recipe.getInstruction(),
                recipe.getImageUrl(),
                recipe.getSeasonId(),
                recipe.getDishTypeId(),
            ]);
        } catch (error) {
            throw new Error('There was an error querying table: Recipe -->' + error);
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
            throw new Error('There was an error querying table: Recipe -->' + error);
        }
    }

    public async findAll() {
        const connect = await dbPool.getConnection();
        const sql = this.queries.findAll;

        try {
            return await connect.query(sql);
        } catch (error) {
            throw new Error('There was an error querying table: Recipe -->' + error);
        } finally {
            connect.release();
        }
    }

    public async update(id: number, recipe: Recipe) {
        const connect = await dbPool.getConnection();
        const sql = this.queries.update;

        try {
            return await connect.query(sql, [
                recipe.getTitle(),
                recipe.getDietType(),
                recipe.getServing(),
                recipe.getPrepTime(),
                recipe.getCookTime(),
                recipe.getInstruction(),
                recipe.getImageUrl(),
                recipe.getSeasonId(),
                recipe.getDishTypeId(),
                id,
            ]);
        } catch (error) {
            throw new Error('There was an error querying table: Recipe -->' + error);
        } finally {
            connect.release();
        }
    }
}
