import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import { Router } from 'express';

import NotificationsController from '../controllers/NotificationsController';
import SponsorshipHistoryController from '../controllers/SponsorshipHistoryController';
import SponsorshipNotificationsController from '../controllers/SponsorshipNotificationsController';

const notificationsRouter = Router();

const notificationsController = new NotificationsController();
const sponsorshipNotificationsController =
  new SponsorshipNotificationsController();
const sponsorshipHistoryController = new SponsorshipHistoryController();

notificationsRouter.use(ensureAuthenticated);

notificationsRouter.get(
  '/sponsorships-history/:sender_id',
  sponsorshipHistoryController.index,
);
notificationsRouter.get(
  '/sponsorships',
  sponsorshipNotificationsController.index,
);

notificationsRouter.post(
  '/send-notifications-for-ios',
  notificationsController.sendNotificationForIos,
);

// notificationsRouter.post(
//   '/create-android-notification',
//   notificationsController.createNotificationForAndroid,
// );

export default notificationsRouter;
