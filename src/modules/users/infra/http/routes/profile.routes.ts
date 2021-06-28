import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import UserProfileController from '../controllers/UserProfileController';
import UserAvatarController from '../controllers/UserAvatarController';
import SendVerificationTokenController from '../controllers/SendVerificationTokenController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const upload = multer(uploadConfig.multer);
const profileRouter = Router();

const sendVerificationTokenController = new SendVerificationTokenController();
const userProfileController = new UserProfileController();
const userAvatarController = new UserAvatarController();

profileRouter.use(ensureAuthenticated);
profileRouter.get('/:username', userProfileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(1).max(30),
      username: Joi.string()
        .regex(/^[A-Z0-9_.]+$/i)
        .min(1)
        .max(30),
      bio: Joi.string().min(2).max(80),
      token: Joi.string().uuid(),
      password: Joi.string(),
      password_confirmation: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.string().required().valid(Joi.ref('password')),
      }),
    },
  }),
  userProfileController.update,
);

profileRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update,
);

profileRouter.delete('/', userProfileController.delete);

profileRouter.post(
  '/send-verification-token',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().max(100).required(),
    },
  }),
  sendVerificationTokenController.handle,
);

profileRouter.post(
  '/send-verification-code',
  userProfileController.sendVerificationCode,
);

profileRouter.post(
  '/verify/update/phone-number',
  userProfileController.validationAndUpdateUserPhoneNumber,
);

export default profileRouter;
