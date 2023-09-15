import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import recipeRouter from './routes/recipeRouter.js';

const app = express();
const port = 3120;

app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.get('/', (req, res) => res.send('Hello, express!'));

app.use('/api', recipeRouter);

app.listen(port, () =>
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`)
);
