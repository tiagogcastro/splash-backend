import { RateLimiterMemory } from 'rate-limiter-flexible';
import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';

const limiter = new RateLimiterMemory({
  points: 1,
  duration: 30,
});

let secDuration = 0;
export default async function ensureLimitedCodeRequests(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip);
  } catch (err) {
    if (secDuration <= 60) {
      secDuration += 30;
    } else if (secDuration < 3600) {
      secDuration = 3600;
    } else {
      secDuration = 86400;
    }

    await limiter.block(request.ip, secDuration);

    throw new AppError(`You need to wait ${secDuration} seconds`, 429);
  }

  return next();
}
