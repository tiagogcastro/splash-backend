import { Router } from 'express';
import smsRouter from '@modules/users/infra/http/routes/sms.routes';
import sponsorsRouter from '@modules/users/infra/http/routes/sponsors.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sponsorshipsRouter from '@modules/sponsorships/infra/http/routes/sponsorships.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sms', smsRouter);
router.use('/sponsors', sponsorsRouter);
router.use('/sponsorships', sponsorshipsRouter);

export default router;
