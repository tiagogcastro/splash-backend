import { Router } from 'express';
import smsRoutes from './sms.routes';
import sponsoringRoutes from './sponsoring.routes';
import usersRoutes from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/sms', smsRoutes);
router.use('/sponsor', sponsoringRoutes);

export default router;
