import { Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { ArrayExistValidator } from './array-exist.validator';

@ValidatorConstraint({ name: 'unique', async: true })
@Injectable()
export class ArrayExist extends ArrayExistValidator {
  constructor(@InjectConnection() protected readonly connection: Connection) {
    super(connection);
  }
}
