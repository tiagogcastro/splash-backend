import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensurePayment from '../middlewares/ensurePayment';
import SponsoredController from '../controllers/SponsoredController';
import SponsorshipsController from '../controllers/SponsorshipsController';
import SponsoredMeController from '../controllers/SponsoredMeController';
import SponsorshipCodeController from '../controllers/SponsorshipCodeController';

const sponsorshipsRouter = Router();

const sponsorshipsController = new SponsorshipsController();
const sponsoredController = new SponsoredController();
const sponsoredMeController = new SponsoredMeController();
const sponsorshipCodeController = new SponsorshipCodeController();

sponsorshipsRouter.use(ensureAuthenticated);

sponsorshipsRouter.get('/sponsored/me', sponsoredMeController.index);
sponsorshipsRouter.get('/sponsored', sponsoredController.index);
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
