import { Global, Module } from '@nestjs/common';

import { ArrayExistValidator } from './array-exist.validator';
import { CloudStorageService } from './cloud-storage.service';
import { SlugService } from './slug.service';

@Global()
@Module({
  providers: [CloudStorageService, SlugService, ArrayExistValidator],
  exports: [CloudStorageService, SlugService, ArrayExistValidator]
})
export class UtilsModule {}
