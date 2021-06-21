import { Router } from 'express';
import SponsorController from '../controllers/SponsorController';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

import SponsoredController from '../controllers/SponsoredController';

const sponsorsRouter = Router();

sponsorsRouter.use(ensureAuthenticated);

const sponsorController = new SponsorController();
const sponsoredController = new SponsoredController();

sponsorsRouter.put('/', sponsorController.update);
sponsorsRouter.delete('/', sponsorController.delete);

sponsorsRouter.get('/:user_id', sponsorController.index);
sponsorsRouter.get('/sponsored/:user_id', sponsoredController.index);

export default sponsorsRouter;
