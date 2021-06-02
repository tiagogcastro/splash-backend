import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import path from 'path';
import mime from 'mime';
import fs from 'fs';
import IStorageProvider from './models/IStorageProvider';

export default class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'sa-east-1',
    });
  }

  async saveFile(file: string): Promise<string> {
    const filePath = path.resolve(uploadConfig.tmpFolder, file);

    const fileType = mime.getType(filePath);

    const fileReaded = fs.promises.readFile(filePath);

    if (!fileType) throw new Error('File not found');

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileReaded,
        ContentType: fileType,
      })
      .promise();

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
