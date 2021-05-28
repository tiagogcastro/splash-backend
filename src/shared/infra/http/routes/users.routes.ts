import { Router } from 'express';

import CreateUsersService from '@modules/users/services/CreateUsersService';
import UsersController from '../controllers/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/', usersController.create);

export default usersRoutes;
