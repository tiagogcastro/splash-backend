import { Router } from 'express';
import smsRoutes from '@modules/users/infra/http/routes/sms.routes';
import sponsorsRoutes from '@modules/users/infra/http/routes/sponsors.routes';
import usersRoutes from '@modules/users/infra/http/routes/users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/sms', smsRoutes);
router.use('/sponsors', sponsorsRoutes);

export default router;
