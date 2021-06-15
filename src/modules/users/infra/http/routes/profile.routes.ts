import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import ProfileUserController from '../controllers/ProfileUserController';
import UserAvatarController from '../controllers/UserAvatarController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

import UsersEmailController from '../controllers/UsersEmailController';

const upload = multer(uploadConfig.multer);
const profileRoutes = Router();

const usersEmailController = new UsersEmailController();
const profileUserController = new ProfileUserController();
const userAvatarController = new UserAvatarController();

profileRoutes.use(ensureAuthenticated);
profileRoutes.get('/:username', profileUserController.show);
profileRoutes.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(1).max(30),
      email: Joi.string().email().max(100),
      username: Joi.string()
        .regex(/^[A-Z0-9_.]+$/i)
        .min(1)
        .max(30),
      bio: Joi.string().min(2).max(80),
      token: Joi.string().uuid(),
      old_password: Joi.string(),
      password: Joi.when('old_password', {
        is: Joi.exist(),
        then: Joi.string().required(),
      }),
      password_confirmation: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.string().required().valid(Joi.ref('password')),
      }),
    },
  }),
  profileUserController.update,
);

profileRoutes.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update,
);

profileRoutes.delete('/', profileUserController.delete);

profileRoutes.put('/add-email', usersEmailController.update);

profileRoutes.post(
  '/send-verification-code',
  profileUserController.sendVerificationCode,
);

profileRoutes.post(
  '/verify/update/phone-number',
  profileUserController.validationAndUpdateUserPhoneNumber,
);

export default profileRoutes;
