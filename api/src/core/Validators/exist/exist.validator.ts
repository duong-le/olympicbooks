import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { Connection, EntitySchema, FindConditions, ObjectType } from 'typeorm';

interface ExistValidationArguments<E> extends ValidationArguments {
  constraints: [ObjectType<E> | EntitySchema<E> | string, ((validationArguments: ValidationArguments) => FindConditions<E>) | keyof E];
}

export abstract class ExistValidator implements ValidatorConstraintInterface {
  protected constructor(protected readonly connection: Connection) {}

  public async validate<E>(value: string, args: ExistValidationArguments<E>): Promise<boolean> {
    const [EntityClass, findCondition = args.property] = args.constraints;
    return (
      (await this.connection.getRepository(EntityClass).count({
        where: typeof findCondition === 'function' ? findCondition(args) : { [findCondition || args.property]: value }
      })) !== 0
    );
  }

  public defaultMessage(args: ValidationArguments): string {
    return `${args.property} not found`;
  }
}
