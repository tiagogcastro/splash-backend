import express, { Router } from 'express';

import usersRoutes from './users.routes';

const router = Router();

router.use(express.json());
router.use('/users', usersRoutes);

export default router;
