import { Express } from 'express';
import DishTypeRouter from './dishTypeRouter';
import RecipeRouter from './recipeRouter';
import ApiDoc from './api-doc';
import swaggerUi from 'swagger-ui-express';

export default function routes(app: Express) {
    app.use('/api/dishtype', new DishTypeRouter().routes());
    app.use('/api/recipe', new RecipeRouter().routes());

    app.use('/docs', swaggerUi.serve, new ApiDoc().routes());
}
