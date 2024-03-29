import { Express } from 'express';

import swaggerUi from 'swagger-ui-express';

import ApiDoc from './api-doc';
import AuthRouter from './authRouter';
import DishTypeRouter from './dishTypeRouter';
import RecipeRouter from './recipeRouter';

import SeasonRouter from './seasonRouter';
import UserRouter from './userRouter';

export default function routes(app: Express) {
    app.use('/auth', new AuthRouter().routes());
    app.use('/api/user', new UserRouter().routes());
    app.use('/api/dishtype', new DishTypeRouter().routes());
    app.use('/api/recipe', new RecipeRouter().routes());
    app.use('/api/season', new SeasonRouter().routes());

    app.use('/docs', swaggerUi.serve, new ApiDoc().routes());
}
