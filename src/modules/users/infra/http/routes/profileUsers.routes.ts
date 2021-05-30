import { Router } from 'express';
import ProfileUserController from '../controllers/ProfileUserController';

const profileRoutes = Router();
const profileUserController = new ProfileUserController();

profileRoutes.get('/:username',profileUserController.show);

export default profileRoutes;