import MongoNotificationRepository from '@modules/notifications/infra/typeorm/repositories/MongoNotificationRepository';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import MongoUserTokensRepository from '@modules/users/infra/typeorm/repositories/MongoUserTokensRepository';
import PostgresSponsorBalanceRepository from '@modules/users/infra/typeorm/repositories/PostgresSponsorBalanceRepository';
import PostgresSponsorSponsoredRepository from '@modules/users/infra/typeorm/repositories/PostgresSponsorSponsoredRepository';

import PostgresUserBalanceRepository from '@modules/users/infra/typeorm/repositories/PostgresUserBalanceRepository';
import PostgresUserSponsorSponsoredCountRepository from '@modules/users/infra/typeorm/repositories/PostgresUserSponsorSponsoredCountRepository';
import PostgresSponsorshipRepository from '@modules/sponsorships/infra/typeorm/repositories/PostgresSponsorshipRepository';
import PostgresUserRepository from '@modules/users/infra/typeorm/repositories/PostgresUserRepository';
import ISponsorBalanceRepository from '@modules/users/repositories/ISponsorBalanceRepository';
import ISponsorshipRepository from '@modules/sponsorships/repositories/ISponsorshipRepository';
import ISponsorSponsoredRepository from '@modules/users/repositories/ISponsorSponsoredRepository';
import IUserBalanceRepository from '@modules/users/repositories/IUserBalanceRepository';
import IUserSponsorSponsoredCountRepository from '@modules/users/repositories/IUserSponsoringSponsoredCountRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { container } from 'tsyringe';
import './providers';

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  MongoUserTokensRepository,
);
container.registerSingleton<INotificationRepository>(
  'NotificationRepository',
  MongoNotificationRepository,
);
container.registerSingleton<IUserRepository>(
  'UserRepository',
  PostgresUserRepository,
);
container.registerSingleton<ISponsorshipRepository>(
  'SponsorshipRepository',
  PostgresSponsorshipRepository,
);

container.registerSingleton<ISponsorBalanceRepository>(
  'SponsorBalanceRepository',
  PostgresSponsorBalanceRepository,
);
container.registerSingleton<ISponsorSponsoredRepository>(
  'SponsorSponsoredRepository',
  PostgresSponsorSponsoredRepository,
);
container.registerSingleton<IUserBalanceRepository>(
  'UserBalanceRepository',
  PostgresUserBalanceRepository,
);
container.registerSingleton<IUserSponsorSponsoredCountRepository>(
  'UserSponsorSponsoredCountRepository',
  PostgresUserSponsorSponsoredCountRepository,
);
