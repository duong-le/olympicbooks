import {MigrationInterface, QueryRunner} from "typeorm";

export class oldProductId1631463930678 implements MigrationInterface {
    name = 'oldProductId1631463930678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" ADD "oldId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."product" DROP COLUMN "oldId"`);
    }

}
