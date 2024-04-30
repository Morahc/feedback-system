import express from 'express';
import router from './routes';
import cookieParser from 'cookie-parser';

import database from './config/database';
import passport from './config/passport';
import 'dotenv/config';
import { deserializeUser, errorMiddleware, notFound } from './middleware';

const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cookieParser());
app.use(deserializeUser);

app.use('/api/v1', router);

app.all('*', notFound);
app.use(errorMiddleware);

app.listen(process.env.PORT, async () => {
  console.log(`Server running on port ${process.env.PORT}`);
  await database();
});
