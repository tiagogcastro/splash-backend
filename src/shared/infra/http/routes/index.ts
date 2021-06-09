import notificationsRouter from '@modules/notifications/infra/http/routes/notifications.routes';
import sponsorshipsRouter from '@modules/sponsorships/infra/http/routes/sponsorships.routes';
import adminsRoutes from '@modules/users/infra/http/routes/admins.routes';
import profileRuter from '@modules/users/infra/http/routes/profile.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';
import sponsorsRouter from '@modules/users/infra/http/routes/sponsors.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import whatssapRoutes from '@modules/users/infra/http/routes/whatssap.routes';
import { Router } from 'express';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRoutes);
router.use('/profile', profileRuter);
router.use('/whats', whatssapRoutes);
router.use('/sponsors', sponsorsRouter);
router.use('/admins', adminsRoutes);
router.use('/sponsorships', sponsorshipsRouter);
router.use('/notifications', notificationsRouter);

export default router;
