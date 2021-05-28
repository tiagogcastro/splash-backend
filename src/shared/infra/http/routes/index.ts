import express, { Router } from 'express';

import usersRoutes from './users.routes';
import smsRoutes from './sms.routes';

const router = Router();

router.use(express.json());
router.use('/users', usersRoutes);
router.use('/sms', smsRoutes);

export default router;
