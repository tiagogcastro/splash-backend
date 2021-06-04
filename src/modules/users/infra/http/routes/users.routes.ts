import { Router } from 'express';
import UsersController from '../controllers/UsersController';

import UsersEmailController from '../controllers/UsersEmailController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const usersRoutes = Router();

const usersEmail = new UsersEmailController();
const usersController = new UsersController();

usersRoutes.post('/', usersEmail.create);
usersRoutes.get('/balance-amount', ensureAuthenticated, usersController.show);

export default usersRoutes;
