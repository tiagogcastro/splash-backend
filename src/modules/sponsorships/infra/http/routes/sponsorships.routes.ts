import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ShopsController from '../controllers/ShopsController';
import SponsorshipCodeController from '../controllers/SponsorshipCodeController';
import SponsorshipsController from '../controllers/SponsorshipsController';
import ensurePayment from '../middlewares/ensurePayment';

const sponsorshipsRouter = Router();

const sponsorshipsController = new SponsorshipsController();
const shopsController = new ShopsController();
const sponsorshipCodeController = new SponsorshipCodeController();

sponsorshipsRouter.use(ensureAuthenticated);

sponsorshipsRouter.get('/sponsored/me', shopsController.index);

sponsorshipsRouter.post(
  '/',
  ensurePayment,
  celebrate({
    [Segments.BODY]: {
      user_recipient_id: Joi.string().uuid(),
      allow_withdrawal_balance: Joi.boolean(),
      amount: Joi.number().required(),
    },
  }),
  sponsorshipsController.create,
);
sponsorshipsRouter.post(
  '/sponsorship-code',
  ensurePayment,
  celebrate({
    [Segments.BODY]: {
      allow_withdrawal_balance: Joi.boolean(),
      amount: Joi.number().required(),
    },
  }),
  sponsorshipCodeController.create,
);

export default sponsorshipsRouter;
