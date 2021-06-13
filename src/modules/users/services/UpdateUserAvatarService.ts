import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface RequestDTO {
  user_id: string;
  avatarFileName: string;
}
class UpdateUserAvatarService {
  constructor(
    private usersRepository: IUsersRepository,

    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user)
      throw new AppError('Only autheticated users can change avatar', 401);

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    user.avatar = avatarFileName;

    await this.storageProvider.saveFile(avatarFileName);

    await this.usersRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
