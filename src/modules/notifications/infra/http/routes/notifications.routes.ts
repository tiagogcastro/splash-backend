import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';

import NotificationsController from '../controllers/NotificationsController';
import SponsorshipHistoryController from '../controllers/SponsorshipHistoryController';

const notificationsRouter = Router();

const notificationsController = new NotificationsController();
const sponsorshipHistoryController = new SponsorshipHistoryController();

notificationsRouter.use(ensureAuthenticated);

notificationsRouter.get(
  '/sponsorships-history/:sender_id',
  sponsorshipHistoryController.index,
);
notificationsRouter.get('/sponsorships', notificationsController.index);

export default notificationsRouter;
