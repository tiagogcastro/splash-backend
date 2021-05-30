import { Router } from 'express';
import SponsorController from '../controllers/SponsorUserController';

import SponsoringUserController from '../controllers/SponsoringUserController';
import SponsoredUserController from '../controllers/SponsoredUserController';

const sponsorsRoutes = Router();

<<<<<<< HEAD
const sponsorUserController = new SponsorController();
const sponsoringUserController = new SponsoringUserController();
const sponsoredUserController = new SponsoredUserController();

sponsorsRoutes.put('/', sponsorUserController.update);
sponsorsRoutes.delete('/', sponsorUserController.delete);

sponsorsRoutes.get('/sponsoring/:user_id', sponsoringUserController.index);
sponsorsRoutes.get('/sponsored/:user_id', sponsoredUserController.index);

export default sponsorsRoutes;
=======
sponsoringRoutes.put('/', sponsoringController.update);
sponsoringRoutes.delete('/', sponsoringController.delete);
sponsoringRoutes.get(
  '/sponsoring/:user_id',
  listSponsorController.indexSponsoring,
);
sponsoringRoutes.get(
  '/sponsored/:user_id',
  listSponsorController.indexSponsored,
);

export default sponsoringRoutes;
>>>>>>> 5a23fea89c6c1577e9554ad0f53b316cd545740a
