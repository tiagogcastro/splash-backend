import { Router } from 'express';
import ListSponsorController from '../controllers/ListSponsorController';
import SponsoringController from '../controllers/SponsoringController';

const sponsoringRoutes = Router();

const sponsoringController = new SponsoringController();
const listSponsorController = new ListSponsorController();

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
