import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

export default async function ensureAdministrator(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const user_id = request.user.id;
  const usersRepository = getRepository(User);

  const admin = await usersRepository.findOne({ id: user_id, roles: 'admin' });

  if (!admin)
    throw new AppError('You need to be a administrator to access here', 401);

  return next();
}
