import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { ValidatorConstraint } from 'class-validator';
import { Connection } from 'typeorm';

import { ArrayExistValidator } from './array-exist.validator';

@ValidatorConstraint({ name: 'array-exist', async: true })
@Injectable()
export class ArrayExist extends ArrayExistValidator {
  constructor(@InjectConnection() protected readonly connection: Connection) {
    super(connection);
  }
}
