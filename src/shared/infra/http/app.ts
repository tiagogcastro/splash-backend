import 'reflect-metadata';
import 'dotenv/config';
import '../typeorm/connection';
import '../mongoose/connection';
import 'express-async-errors';
import '@shared/container';
import uploadConfig from '@config/upload';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import rateLimiter from './middlewares/rateLimiter';
import AppError from '../../errors/AppError';
import router from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/static', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);

app.use(router);

app.use(errors());

/**
 *  Global Exception Handler
 */
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  },
);

export default app;
