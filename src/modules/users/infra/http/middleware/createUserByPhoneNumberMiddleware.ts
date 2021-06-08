import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default function createUserByPhoneNumberMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { userPhone } = req.query;

  if (!userPhone) {
    throw new AppError('User number is missing', 401);
  }

  req.user = {
    id: '',
    phone_number: String(userPhone),
  };

  return next();
}
