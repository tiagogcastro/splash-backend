import 'reflect-metadata';
import '../typeorm/connection';
import 'dotenv/config';
import 'express-async-errors';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import AppError from '../../errors/AppError';
import router from './routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

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
