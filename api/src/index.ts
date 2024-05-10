import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import database from './config/database';
import router from './routes';
import { deserializeUser, errorMiddleware, notFound } from './middleware';

const app = express();

app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use(deserializeUser);
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/v1', router);

app.all('*', notFound);
app.use(errorMiddleware);

app.listen(process.env.PORT, async () => {
  console.log(`Server running on port ${process.env.PORT}`);
  await database();
});
