import { Router } from 'express';
import ProfileUserController from '../controllers/ProfileUserController';

const profileRoutes = Router();
const profileUserController = new ProfileUserController();

profileRoutes.get('/:username',profileUserController.show);
profileRoutes.put('/',profileUserController.update);
profileRoutes.delete('/',profileUserController.delete);

export default profileRoutes;