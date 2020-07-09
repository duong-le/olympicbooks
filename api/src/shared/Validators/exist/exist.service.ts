import { Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { ExistValidator } from './exist.validator';

@ValidatorConstraint({ name: 'exist', async: true })
@Injectable()
export class Exist extends ExistValidator {
  constructor(@InjectConnection() protected readonly connection: Connection) {
    super(connection);
  }
}
