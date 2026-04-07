import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';

@Injectable()
export class StorageService {
  private s3 = new S3Client({region: 'ru-central1', endpoint: 'https://storage.yandexcloud.net', credentials: {accessKeyId: process.env.S3_ACCESS_KEY!, secretAccessKey: process.env.S3_SECRET_KEY!, },});
  private bucket = process.env.S3_BUCKET!;
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = `${randomUUID()}-${file.originalname}`;
    await this.s3.send(
      new PutObjectCommand({Bucket: this.bucket, Key: key, Body: file.buffer, ContentType: file.mimetype, }),);
    return `https://storage.yandexcloud.net/${this.bucket}/${key}`;
  }
}