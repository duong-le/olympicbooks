import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductTitle1612893262945 implements MigrationInterface {
  name = 'ProductTitle1612893262945';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_item" ADD "productTitle" character varying DEFAULT null`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "productTitle"`);
  }
}
