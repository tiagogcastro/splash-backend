import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SponsoredController from '@modules/users/infra/http/controllers/SponsoredUserController';
import ensurePayment from '../middlewares/ensurePayment';
import SponsorshipsController from '../controllers/SponsorshipsController';
import SponsorshipCodeController from '../controllers/SponsorshipCodeController';
import ShopsController from '../controllers/ShopsController';

const sponsorshipsRouter = Router();

const sponsorshipsController = new SponsorshipsController();
const shopsController = new ShopsController();
const sponsoredController = new SponsoredController();
const sponsorshipCodeController = new SponsorshipCodeController();

sponsorshipsRouter.use(ensureAuthenticated);

sponsorshipsRouter.get('/sponsored/me', sponsoredController.index);
sponsorshipsRouter.get('/sponsored', shopsController.index);
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
