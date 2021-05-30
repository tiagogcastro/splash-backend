import { Router } from 'express';
import smsRoutes from './sms.routes';
import sponsoringRoutes from './sponsoring.routes';
import usersRoutes from './users.routes';

const router = Router();

router.use('/users', usersRoutes);
router.use('/sms', smsRoutes);
<<<<<<< HEAD
router.use('/sponsor', sponsoringRoutes);
=======
>>>>>>> 5a23fea89c6c1577e9554ad0f53b316cd545740a

export default router;
