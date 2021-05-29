import express, { Router } from 'express';

import sponsoringRoutes from './sponsoring.routes';
import usersRoutes from './users.routes';
import smsRoutes from './sms.routes';

const router = Router();

router.use(express.json());
router.use('/users', usersRoutes);
router.use('/sms', smsRoutes);
router.use('/sponsor', sponsoringRoutes);

export default router;
