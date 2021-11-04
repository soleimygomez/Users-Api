import express,{ json } from 'express';
const routerApi=require('./routes');
import morgan from 'morgan';

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(json());

//routes
routerApi(app);


export default app;