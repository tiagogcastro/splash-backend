import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensurePayment from '../middlewares/ensurePayment';
import SponsoredController from '../controllers/SponsoredController';
import SponsorshipsController from '../controllers/SponsorshipsController';
import SponsoredMeController from '../controllers/SponsoredMeController';

const sponsorshipsRouter = Router();

const sponsorshipsController = new SponsorshipsController();
const sponsoredController = new SponsoredController();
const sponsoredMeController = new SponsoredMeController();

sponsorshipsRouter.use(ensureAuthenticated);

sponsorshipsRouter.get('/sponsored/me', sponsoredMeController.index);
sponsorshipsRouter.get('/sponsored', sponsoredController.index);
sponsorshipsRouter.post(
  '/',
  ensurePayment,
  celebrate({
    [Segments.BODY]: {
      user_recipient_id: Joi.string().uuid().required(),
      allow_withdrawal_balance: Joi.boolean(),
      sponsorship_code: Joi.boolean(),
      amount: Joi.number().required(),
    },
  }),
  sponsorshipsController.create,
);

export default sponsorshipsRouter;
