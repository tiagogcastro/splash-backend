import { Router } from 'express';
import SponsorController from '../controllers/SponsorUserController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

import SponsoringUserController from '../controllers/SponsoringUserController';
import SponsoredController from '../controllers/SponsoredController';

const sponsorsRoutes = Router();

sponsorsRoutes.use(ensureAuthenticated);

const sponsorUserController = new SponsorController();
const sponsoringUserController = new SponsoringUserController();
const sponsoredController = new SponsoredController();

sponsorsRoutes.put('/', sponsorUserController.update);
sponsorsRoutes.delete('/', sponsorUserController.delete);

sponsorsRoutes.get('/sponsoring/:user_id', sponsoringUserController.index);
sponsorsRoutes.get('/sponsored/:user_id', sponsoredController.index);

export default sponsorsRoutes;
