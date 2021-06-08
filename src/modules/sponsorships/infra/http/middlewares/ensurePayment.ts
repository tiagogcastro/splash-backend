import { RateLimiterMemory } from 'rate-limiter-flexible';
import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

const limiter = new RateLimiterMemory({
  points: 5,
  duration: 180,
});

export default async function ensurePayment(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);

    return next();
  } catch {
    throw new AppError('You can send a sponsorship after 3 minutes', 429);
  }
}
