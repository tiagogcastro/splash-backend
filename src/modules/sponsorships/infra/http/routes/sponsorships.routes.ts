import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
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
sponsorshipsRouter.post('/', sponsorshipsController.create);

export default sponsorshipsRouter;
