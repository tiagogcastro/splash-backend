import uploadConfig from '@config/upload';
import { Router } from 'express';
import multer from 'multer';
import ProfileUserController from '../controllers/ProfileUserController';
import UserAvatarController from '../controllers/UserAvatarController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const upload = multer(uploadConfig.multer);
const profileRoutes = Router();

const profileUserController = new ProfileUserController();
const userAvatarController = new UserAvatarController();

profileRoutes.use(ensureAuthenticated);
profileRoutes.get('/:username', profileUserController.show);
profileRoutes.put('/', profileUserController.update);

profileRoutes.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update,
);

profileRoutes.delete('/', profileUserController.delete);

export default profileRoutes;
