import { Global, Module } from '@nestjs/common';

import { CloudStorageService } from './cloud-storage.service';
import { SlugService } from './slug.service';

@Global()
@Module({
  providers: [CloudStorageService, SlugService],
  exports: [CloudStorageService, SlugService]
})
export class UtilsModule {}
