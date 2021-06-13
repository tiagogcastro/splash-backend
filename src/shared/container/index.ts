import MongoUserTokensRepository from '@modules/users/infra/typeorm/repositories/MongoUserTokensRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import PostgresUsersRepository from '@modules/users/infra/typeorm/repositories/PostgresUsersRepository';
import MongoNotificationsRepository from '@modules/notifications/infra/typeorm/repositories/MongoNotificationsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { container } from 'tsyringe';

import './providers';

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  MongoUserTokensRepository,
);
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PostgresUsersRepository,
);
container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  MongoNotificationsRepository,
);
