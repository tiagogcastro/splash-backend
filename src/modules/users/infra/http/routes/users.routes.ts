import { Router } from 'express';

import UsersEmailController from '../controllers/UsersEmailController';

const usersRoutes = Router();

const usersEmail = new UsersEmailController();

usersRoutes.post('/', usersEmail.create);

export default usersRoutes;
