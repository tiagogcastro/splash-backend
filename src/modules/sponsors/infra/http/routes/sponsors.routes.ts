import { Router } from 'express';
import SendSponsorshipController from '../controllers/SendSponsorshipController';

const sponsorsRouter = Router();

const sendSponsorshipController = new SendSponsorshipController();

sponsorsRouter.post('/', sendSponsorshipController.handle);

export default sponsorsRouter;
