import { Express } from 'express';
import DishTypeRouter from './dishTypeRouter';

export default function routes(app: Express) {
    app.use('/api/dishtype', new DishTypeRouter().routes());
}
