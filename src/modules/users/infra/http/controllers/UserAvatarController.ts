import uploadConfig from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import DiskStorageProvider from '@shared/container/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/container/providers/StorageProvider/S3StorageProvider';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import PostgresUsersRepository from '../../typeorm/repositories/PostgresUsersRepository';

export default class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const providers = {
      disk: new DiskStorageProvider(),
      s3: new S3StorageProvider(),
    };
    const postgresUsersRepository = new PostgresUsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(
      postgresUsersRepository,
      providers[uploadConfig.driver],
    );

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });
    return response.status(200).json(classToClass(user));
  }
}
