import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';
import SponsorshipsController from '../controllers/SponsorshipsController';

const sponsorshipsRouter = Router();

const sponsorshipsController = new SponsorshipsController();

sponsorshipsRouter.use(ensureAuthenticated);

sponsorshipsRouter.post('/', sponsorshipsController.create);

export default sponsorshipsRouter;
