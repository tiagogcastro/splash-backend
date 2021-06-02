import { Router } from 'express';
import smsRouter from '@modules/users/infra/http/routes/sms.routes';
import sponsorsRouter from '@modules/users/infra/http/routes/sponsors.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import profileRuter from '@modules/users/infra/http/routes/profile.routes';
import sponsorshipsRouter from '@modules/sponsorships/infra/http/routes/sponsorships.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import notificationsRouter from '@modules/notifications/infra/http/routes/notifications.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRoutes);
router.use('/profile', profileRuter);
router.use('/sms', smsRouter);
router.use('/sponsors', sponsorsRouter);
router.use('/sponsorships', sponsorshipsRouter);
router.use('/notifications', notificationsRouter);

export default router;
