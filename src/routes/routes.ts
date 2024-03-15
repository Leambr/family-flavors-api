import { Express } from 'express';
import DishTypeRouter from './dishTypeRouter';
import RecipeRouter from './recipeRouter';

export default function routes(app: Express) {
    app.use('/api/dishtype', new DishTypeRouter().routes());
    app.use('/api/recipe', new RecipeRouter().routes());
}
