import { Router } from 'express';
import SponsoringController from '../controllers/SponsoringController';

const sponsoringRoutes = Router();

const sponsoringController = new SponsoringController();

sponsoringRoutes.put('/', sponsoringController.update);

export default sponsoringRoutes;