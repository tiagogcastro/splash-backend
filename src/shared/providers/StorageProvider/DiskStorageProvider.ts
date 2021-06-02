import IStorageProvider from './models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  async saveFile(file: string): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async deleteFile(file: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
