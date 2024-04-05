import dbPool from '../../../config/databaseConfig';
import { Recipe } from '../../../Domain/models';

import RecipeQueries from './queries';

export default class RecipeRepository {
    constructor(private queries = new RecipeQueries()) {}

    public async create(recipe: Recipe) {
        const connect = await dbPool.getConnection();
        const sql = this.queries.create;

        try {
            return await connect.query(sql, [
                recipe.title,
                recipe.dietType,
                recipe.serving,
                recipe.prepTime,
                recipe.cookTime,
                recipe.instruction,
                recipe.imageUrl,
                recipe.seasonId,
                recipe.dishTypeId,
            ]);
        } catch (error) {
            throw new Error('There was an error querying table: Recipe -->' + error);
        } finally {
            connect.release();
        }
    }

    // findByRecipeId et faire une classe pour le paramètre --> repo pas finder
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
                recipe.title,
                recipe.dietType,
                recipe.serving,
                recipe.prepTime,
                recipe.cookTime,
                recipe.instruction,
                recipe.imageUrl,
                recipe.seasonId,
                recipe.dishTypeId,
                id,
            ]);
        } catch (error) {
            throw new Error('There was an error querying table: Recipe -->' + error);
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
            throw new Error('There was an error querying table: Recipe -->' + error);
        } finally {
            connect.release();
        }
    }

    public async findRecipeByDishTypeId(dishTypeId: number) {
        const connect = await dbPool.getConnection();
        const sql = this.queries.findByDishTypeId;

        try {
            return await connect.query(sql, dishTypeId);
        } catch (error) {
            throw new Error('There was an error querying table: Recipe -->' + error);
        } finally {
            connect.release();
        }
    }
}
