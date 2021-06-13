import { NextFunction, Request, Response } from 'express';
import { isAfter } from 'date-fns';
import client from 'twilio';
import twilioConfig from '../../../../../config/twilio';

export default async function smsRateLimit(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  // const { accountSid, authToken, servicesSid } = twilioConfig.twilio;
  // const connectService = client(accountSid, authToken);
  // const createRateLimit = await connectService.verify
  //   .services(servicesSid)
  //   .rateLimits.create({
  //     description: 'Limit verifications by End User IP Address',
  //     uniqueName: `user_ip_address_${String(request.ip)}`,
  //   });
  // if (!createRateLimit) {
  //   console.log('teste');
  // }
  // await connectService.verify
  //   .services(servicesSid)
  //   .rateLimits(createRateLimit.sid)
  //   .buckets.create({
  //     max: 1,
  //     interval: 60,
  //   })
  //   .then(async rate_limitt => {
  //     // const rateLimitCreateAt = rate_limitt.dateCreated.getHours();
  //     console.log(rate_limitt);
  //     return next();j
  //   })
  //   .catch(err => {
  //     console.log('testee', err);
  //   });
}
