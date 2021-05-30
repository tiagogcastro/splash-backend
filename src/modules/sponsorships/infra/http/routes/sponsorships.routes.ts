import { Router } from 'express';
import SponsorshipsController from '../controllers/SponsorshipsController';

const sponsorshipsRouter = Router();

const sponsorshipsController = new SponsorshipsController();

sponsorshipsRouter.post('/', sponsorshipsController.create);

export default sponsorshipsRouter;
