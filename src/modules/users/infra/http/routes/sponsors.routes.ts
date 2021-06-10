import { Router } from 'express';
import SponsorController from '../controllers/SponsorUserController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

import SponsoringUserController from '../controllers/SponsoringUserController';
import SponsoredUserController from '../controllers/SponsoredUserController';

const sponsorsRoutes = Router();

sponsorsRoutes.use(ensureAuthenticated);

const sponsorUserController = new SponsorController();
const sponsoringUserController = new SponsoringUserController();
const sponsoredUserController = new SponsoredUserController();

sponsorsRoutes.put('/', sponsorUserController.update);
sponsorsRoutes.delete('/', sponsorUserController.delete);

sponsorsRoutes.get('/sponsoring/:user_id', sponsoringUserController.index);
sponsorsRoutes.get('/sponsored/:user_id', sponsoredUserController.index);

export default sponsorsRoutes;
