import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import SponsorshipsController from '../controllers/SponsorshipsController';
import SponsoredController from '../controllers/SponsoredController';

const sponsorshipsRouter = Router();

const sponsorshipsController = new SponsorshipsController();
const sponsoredController = new SponsoredController();

sponsorshipsRouter.use(ensureAuthenticated);

sponsorshipsRouter.get('/sponsored/me', sponsoredController.index);
sponsorshipsRouter.post('/', sponsorshipsController.create);

export default sponsorshipsRouter;
