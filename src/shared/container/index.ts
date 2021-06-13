import MongoNotificationsRepository from '@modules/notifications/infra/typeorm/repositories/MongoNotificationsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import MongoUserTokensRepository from '@modules/users/infra/typeorm/repositories/MongoUserTokensRepository';
import PostgresSponsorBalanceRepository from '@modules/users/infra/typeorm/repositories/PostgresSponsorBalanceRepository';
import PostgresSponsoringSponsoredRepository from '@modules/users/infra/typeorm/repositories/PostgresSponsoringSponsoredRepository';

import PostgresUserBalanceRepository from '@modules/users/infra/typeorm/repositories/PostgresUserBalanceRepository';
import PostgresUserSponsoringSponsoredCountRepository from '@modules/users/infra/typeorm/repositories/PostgresUserSponsoringSponsoredCountRepository';
import PostgresSponsorshipsRepository from '@modules/sponsorships/infra/typeorm/repositories/PostgresSponsorshipsRepository';
import PostgresUsersRepository from '@modules/users/infra/typeorm/repositories/PostgresUsersRepository';
import ISponsorBalanceRepository from '@modules/users/repositories/ISponsorBalanceRepository';
import ISponsorshipsRepository from '@modules/sponsorships/repositories/ISponsorshipsRepository';
import ISponsoringSponsoredRepository from '@modules/users/repositories/ISponsoringSponsoredRepository';
import IUserBalanceRepository from '@modules/users/repositories/IUserBalanceRepository';
import IUserSponsoringSponsoredCountRepository from '@modules/users/repositories/IUserSponsoringSponsoredCountRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import { container } from 'tsyringe';
import './providers';

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  MongoUserTokensRepository,
);
container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  MongoNotificationsRepository,
);
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PostgresUsersRepository,
);
container.registerSingleton<ISponsorshipsRepository>(
  'SponsorshipsRepository',
  PostgresSponsorshipsRepository,
);

container.registerSingleton<ISponsorBalanceRepository>(
  'SponsorBalanceRepository',
  PostgresSponsorBalanceRepository,
);
container.registerSingleton<ISponsoringSponsoredRepository>(
  'sponsoringSponsoredRepository',
  PostgresSponsoringSponsoredRepository,
);
container.registerSingleton<IUserBalanceRepository>(
  'UserBalanceRepository',
  PostgresUserBalanceRepository,
);
container.registerSingleton<IUserSponsoringSponsoredCountRepository>(
  'UserSponsoringSponsoredCountRepository',
  PostgresUserSponsoringSponsoredCountRepository,
);
