import { Metadata } from '@google-cloud/common/build/src/service-object';
import { Bucket, Storage } from '@google-cloud/storage';
import { BadRequestException, Injectable } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { memoryStorage } from 'multer';
import { parse } from 'path';

import { File } from '../../shared/Interfaces/file.interface';
import { SlugService } from './slug.service';

export const UploadOptions: MulterOptions = {
  storage: memoryStorage(),
  limits: { fileSize: 0.5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    return file.mimetype.match(/image\/(jpg|jpeg|png|gif)$/)
      ? callback(null, true)
      : callback(new BadRequestException('Only image files are allowed'), false);
  }
};

@Injectable()
export class CloudStorageService {
  private bucket: Bucket;
  private storage: Storage;

  constructor(public slugService: SlugService) {
    this.storage = new Storage();
    this.bucket = this.storage.bucket(process.env.GCS_BUCKET);
  }

  private getFilename(uploadedFile: File, destination: string): string {
    const originalName = parse(uploadedFile.originalname);
    let fileName = this.slugService.createSlug(originalName.name, Date.now()) + originalName.ext;

    destination = this.slugService.createSlug(destination);
    if (destination) destination += '/';

    return destination + fileName;
  }

  async uploadFile(uploadedFile: File, destination: string): Promise<Metadata & { publicUrl: string }> {
    const fileName = this.getFilename(uploadedFile, destination);
    const file = this.bucket.file(fileName);

    try {
      await file.save(uploadedFile.buffer, { contentType: uploadedFile.mimetype });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }

    return { ...file.metadata, publicUrl: `https://storage.googleapis.com/${this.bucket.name}/${file.name}` };
  }

  async removeFile(fileName: string): Promise<void> {
    const file = this.bucket.file(fileName);

    try {
      await file.delete();
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
