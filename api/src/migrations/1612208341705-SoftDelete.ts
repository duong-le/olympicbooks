import { MigrationInterface, QueryRunner } from 'typeorm';

export class SoftDelete1612208341705 implements MigrationInterface {
  name = 'SoftDelete1612208341705';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "discount" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "shipping_method" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "shipping" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "transaction_method" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "transaction" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "cart_item" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "order" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "order_item" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "publisher" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "product_image" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "product" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "author" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "author" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "product_image" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "publisher" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "cart_item" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "transaction_method" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "shipping" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "shipping_method" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "discount" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "deletedAt"`);
  }
}
