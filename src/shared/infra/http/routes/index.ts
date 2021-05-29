import express, { Router } from 'express';

import sponsoringRoutes from './sponsoring.routes';
import usersRoutes from './users.routes';
import smsRoutes from './sms.routes';

const router = Router();

router.use(express.json());
router.use('/users', usersRoutes);
<<<<<<< HEAD
router.use('/sms', smsRoutes);
=======
router.use('/sponsor', sponsoringRoutes);
>>>>>>> fe767e68cd469e01192353959a4abeb317217ec2

export default router;
