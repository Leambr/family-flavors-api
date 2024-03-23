import express from 'express';
import morgan from 'morgan';

import expressConfig from './config/expressConfig';
import routes from './routes/routes';

// Config
const app = express();
const port = 3120;

expressConfig(app);
app.use(morgan('dev'));

// Routes
routes(app);

app.listen(port, () =>
    console.log(`Notre application Node est démarrée sur : http://localhost:${port}`)
);
