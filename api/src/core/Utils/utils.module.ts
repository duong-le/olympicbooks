import { Global, Module } from '@nestjs/common';

import { ArrayExistValidator } from './array-exist.validator';
import { CloudStorageService } from './cloud-storage.service';
import { ExistValidator } from './exist.validator';
import { SlugService } from './slug.service';

@Global()
@Module({
  providers: [CloudStorageService, SlugService, ExistValidator, ArrayExistValidator],
  exports: [CloudStorageService, SlugService, ExistValidator, ArrayExistValidator]
})
export class UtilsModule {}
