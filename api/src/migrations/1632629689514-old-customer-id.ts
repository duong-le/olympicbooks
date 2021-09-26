import {MigrationInterface, QueryRunner} from "typeorm";

export class oldCustomerId1632629689514 implements MigrationInterface {
    name = 'oldCustomerId1632629689514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."customer" ADD "oldId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."customer" DROP COLUMN "oldId"`);
    }

}
