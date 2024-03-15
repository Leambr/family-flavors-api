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
                recipe.getInstructions(),
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
}