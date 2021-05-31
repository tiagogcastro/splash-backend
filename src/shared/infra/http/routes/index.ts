import { Router } from 'express';
import smsRouter from '@modules/users/infra/http/routes/sms.routes';
import sponsorsRouter from '@modules/users/infra/http/routes/sponsors.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import userProfileRuter from '@modules/users/infra/http/routes/profileUsers.routes';
import sponsorshipsRouter from '@modules/sponsorships/infra/http/routes/sponsorships.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRoutes);
router.use('/profile', userProfileRuter);
router.use('/sms', smsRouter);
router.use('/sponsors', sponsorsRouter);
router.use('/sponsorships', sponsorshipsRouter);

export default router;
