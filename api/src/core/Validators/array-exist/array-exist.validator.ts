import { isObject } from '@nestjs/common/utils/shared.utils';
import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { Connection, EntitySchema, FindConditions, In, ObjectType } from 'typeorm';

export interface ExistArrayValidationArguments<E> extends ValidationArguments {
  constraints: [
    ObjectType<E> | EntitySchema<E> | string,
    ((validationArguments: ValidationArguments, value: any[]) => FindConditions<E>) | keyof E,
    ((validationArguments: ValidationArguments, value: any[], entityCount: number) => boolean) | string | undefined,
    number | undefined
  ];
}

export abstract class ArrayExistValidator implements ValidatorConstraintInterface {
  protected constructor(protected readonly connection: Connection) {}

  public async validate<E>(value: any[], args: ExistArrayValidationArguments<E>): Promise<boolean> {
    const [EntityClass, findCondition = args.property, validationCondition] = args.constraints;

    if (!value.length) return false;
    const entityCount = await this.connection.getRepository(EntityClass).count({
      where:
        typeof findCondition === 'function'
          ? findCondition(args, value)
          : {
              [findCondition]: In(
                validationCondition && typeof validationCondition !== 'function'
                  ? value.map((val) => (isObject(val) ? val[validationCondition] : val))
                  : value
              )
            }
    });
    args.constraints[3] = entityCount;
    return typeof validationCondition === 'function' ? validationCondition(args, value, entityCount) : value.length === entityCount;
  }

  public defaultMessage(args: ValidationArguments): string {
    return `${args.property} not found`;
  }
}
