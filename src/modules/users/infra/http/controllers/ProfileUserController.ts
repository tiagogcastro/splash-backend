import { Request, Response } from 'express';
import mailConfig from '@config/mail';
import UpdateProfileUserService from '@modules/users/services/UpdateProfileUserService';
import ShowProfileUserService from '@modules/users/services/ShowProfileUserService';
import DeleteProfileUserService from '@modules/users/services/DeleteProfileUserService';
import { classToClass } from 'class-transformer';
import SESMailProvider from '@shared/container/providers/MailProvider/SESMailProvider';
import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/HandlebarsMailTemplateProvider';
import EtherealMailProvider from '@shared/container/providers/MailProvider/EtherealMailProvider';
import MailgunMailProvider from '@shared/container/providers/MailProvider/MailgunMailProvider';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';
import MongoUserTokensRepository from '../../typeorm/repositories/MongoUserTokensRepository';

class ProfileUserController {
  async show(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;

    const usersRepository = new PostgresUsersRepository();
    const showProfileUser = new ShowProfileUserService(usersRepository);

    const user = await showProfileUser.execute(username);

    return response.json(classToClass(user));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { username, password, old_password, bio, email, token, name } =
      request.body;
    const user_id = request.user.id;

    const postgresUsersRepository = new PostgresUsersRepository();
    const mongoUserTokensRepository = new MongoUserTokensRepository();
    const handlebarsMailTemplateProvider = new HandlebarsMailTemplateProvider();

    const providers = {
      ses: new SESMailProvider(handlebarsMailTemplateProvider),
      ethereal: new EtherealMailProvider(handlebarsMailTemplateProvider),
      mailgun: new MailgunMailProvider(handlebarsMailTemplateProvider),
    };

    const updateProfile = new UpdateProfileUserService(
      postgresUsersRepository,
      mongoUserTokensRepository,
      providers[mailConfig.driver],
    );

    const userUpdated = await updateProfile.execute({
      user_id,
      username,
      password,
      old_password,
      token,
      email,
      bio,
      name,
    });

    return response.json(classToClass(userUpdated));
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const usersRepository = new PostgresUsersRepository();
    const deleteProfile = new DeleteProfileUserService(usersRepository);

    await deleteProfile.execute(user_id);

    return response.status(204).send();
  }
}

export default ProfileUserController;
