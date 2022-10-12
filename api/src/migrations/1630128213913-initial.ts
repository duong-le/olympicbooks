import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1630128213913 implements MigrationInterface {
    name = 'initial1630128213913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "hashedPassword" character varying NOT NULL, "isBlock" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_item" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "quantity" integer NOT NULL, "customerId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "UQ_4c8960b150147764200b083ec8b" UNIQUE ("customerId", "productId"), CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "hashedPassword" character varying NOT NULL, "isBlock" boolean NOT NULL DEFAULT false, "address" character varying, "phoneNumber" character varying, CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipping_method" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying, "description" character varying NOT NULL, "fee" integer NOT NULL, "disabled" boolean NOT NULL, CONSTRAINT "PK_b9b0adfad3c6b99229c1e7d4865" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipping" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying, "address" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "state" character varying NOT NULL DEFAULT 'processing', "code" character varying, "fee" integer NOT NULL DEFAULT '0', "deliveryDate" TIMESTAMP, "shippingMethodId" integer NOT NULL, CONSTRAINT "PK_0dc6ac92ee9cbc2c1611d77804c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_method" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying, "description" character varying NOT NULL, "info" character varying, "disabled" boolean NOT NULL, CONSTRAINT "PK_46299cdd290767885705d0645a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "transactionMethodId" integer NOT NULL, "state" character varying NOT NULL DEFAULT 'pending', "value" integer NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "buyerNote" character varying, "sellerNote" character varying, "customerId" integer NOT NULL, "transactionId" integer NOT NULL, "shippingId" integer NOT NULL, CONSTRAINT "REL_8f2bb52a4384d2d5f1ff59fb9e" UNIQUE ("transactionId"), CONSTRAINT "REL_8bf3257f3efd245c9f292c169c" UNIQUE ("shippingId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "quantity" integer NOT NULL, "totalValue" integer NOT NULL, "productTitle" character varying, "orderId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_image" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "imgUrl" character varying, "imgName" character varying, "productId" integer, CONSTRAINT "PK_99d98a80f57857d51b5f63c8240" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "slug" character varying, "description" character varying NOT NULL, "price" integer NOT NULL, "originalPrice" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'active', "categoryId" integer NOT NULL, CONSTRAINT "UQ_8cfaf4a1e80806d58e3dbe69224" UNIQUE ("slug"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "slug" character varying, "imgUrl" character varying, "imgName" character varying, "parentId" integer, CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "mandatory" boolean NOT NULL DEFAULT true, "inputMode" character varying NOT NULL DEFAULT 'default', CONSTRAINT "PK_b13fb7c5c9e9dff62b60e0de729" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attribute_value" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "attributeId" integer NOT NULL, CONSTRAINT "UQ_99b10f95717611b98abc1dec326" UNIQUE ("name", "attributeId"), CONSTRAINT "PK_dff76d9cc1db2684732acdb9ca7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_attribute" ("productId" integer NOT NULL, "attributeValueId" integer NOT NULL, CONSTRAINT "PK_c91b2c165f97f0c8abbd9b0c2e0" PRIMARY KEY ("productId", "attributeValueId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c0d597555330c0a972122bf467" ON "product_attribute" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c1bf4950dee394db4b9cad0607" ON "product_attribute" ("attributeValueId") `);
        await queryRunner.query(`CREATE TABLE "category_attribute" ("categoryId" integer NOT NULL, "attributeId" integer NOT NULL, CONSTRAINT "PK_f4f2de964c49011f9c7830913ae" PRIMARY KEY ("categoryId", "attributeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6ae9fd1960af2eb3b290036c1c" ON "category_attribute" ("categoryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_02d2d1bd2127e4d54302549fef" ON "category_attribute" ("attributeId") `);
        await queryRunner.query(`CREATE TABLE "category_closure" ("ancestor_category_id" integer NOT NULL, "descendant_category_id" integer NOT NULL, CONSTRAINT "PK_59f80a086f443a9c31700e54e37" PRIMARY KEY ("ancestor_category_id", "descendant_category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4c04930e4573b49ab28a4600da" ON "category_closure" ("ancestor_category_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_11da9decc6d053c89b14825abe" ON "category_closure" ("descendant_category_id") `);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_148f242733fba9b734a4cdc8772" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipping" ADD CONSTRAINT "FK_a36ba189b1d8e809dc1ad5d23e3" FOREIGN KEY ("shippingMethodId") REFERENCES "shipping_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_4191531f6a2174e137f5d448645" FOREIGN KEY ("transactionMethodId") REFERENCES "transaction_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_8f2bb52a4384d2d5f1ff59fb9e6" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_8bf3257f3efd245c9f292c169c5" FOREIGN KEY ("shippingId") REFERENCES "shipping"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD CONSTRAINT "FK_40ca0cd115ef1ff35351bed8da2" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attribute_value" ADD CONSTRAINT "FK_123ac30d8ade936347e4099cc4a" FOREIGN KEY ("attributeId") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_attribute" ADD CONSTRAINT "FK_c0d597555330c0a972122bf4673" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_attribute" ADD CONSTRAINT "FK_c1bf4950dee394db4b9cad06072" FOREIGN KEY ("attributeValueId") REFERENCES "attribute_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_attribute" ADD CONSTRAINT "FK_6ae9fd1960af2eb3b290036c1c8" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "category_attribute" ADD CONSTRAINT "FK_02d2d1bd2127e4d54302549fefd" FOREIGN KEY ("attributeId") REFERENCES "attribute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD CONSTRAINT "FK_4c04930e4573b49ab28a4600da8" FOREIGN KEY ("ancestor_category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category_closure" ADD CONSTRAINT "FK_11da9decc6d053c89b14825abe2" FOREIGN KEY ("descendant_category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`
            INSERT INTO "transaction_method" ("id", "createdAt", "updatedAt", "deletedAt", "name", "description", "info", "disabled") VALUES
            (1, '2020-11-12 14:44:56.262616', '2020-11-12 14:44:56.262616', NULL, 'cod', 'Thanh toán tiền mặt khi nhận hàng', 'Quý khách vui lòng thanh toán tiền mặt cho nhân viên giao hàng ngay khi nhận được đơn hàng của mình', 'f'),
            (2, '2020-11-12 14:44:56.262616', '2020-11-12 14:44:56.262616', NULL, 'atm', 'Thanh toán bằng thẻ ATM nội địa/Internet Banking', 'Họ tên: Đào Đăng Đạt\nNgân hàng: Techcombank - Ngân hàng TMCP Kỹ thương Việt Nam\nSố tài khoản: 19031245246661', 'f'),
            (3, '2020-11-12 14:44:56.262616', '2020-11-12 14:44:56.262616', NULL, 'momo', 'Thanh toán bằng ví điện tử MoMo', 'Họ tên: Đào Đăng Đạt\nSố điện thoại: 0984803198', 'f');
        `);
        await queryRunner.query(`
            INSERT INTO "public"."shipping_method" ("id", "createdAt", "updatedAt", "deletedAt", "name", "description", "fee", "disabled") VALUES
            (1, '2020-11-12 14:44:56.262616', '2020-11-12 14:44:56.262616', NULL, 'standard', 'Giao tiêu chuẩn', 35000, 'f'),
            (2, '2020-11-12 14:44:56.262616', '2020-11-12 14:44:56.262616', NULL, 'express', 'Giao nhanh', 60000, 't');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category_closure" DROP CONSTRAINT "FK_11da9decc6d053c89b14825abe2"`);
        await queryRunner.query(`ALTER TABLE "category_closure" DROP CONSTRAINT "FK_4c04930e4573b49ab28a4600da8"`);
        await queryRunner.query(`ALTER TABLE "category_attribute" DROP CONSTRAINT "FK_02d2d1bd2127e4d54302549fefd"`);
        await queryRunner.query(`ALTER TABLE "category_attribute" DROP CONSTRAINT "FK_6ae9fd1960af2eb3b290036c1c8"`);
        await queryRunner.query(`ALTER TABLE "product_attribute" DROP CONSTRAINT "FK_c1bf4950dee394db4b9cad06072"`);
        await queryRunner.query(`ALTER TABLE "product_attribute" DROP CONSTRAINT "FK_c0d597555330c0a972122bf4673"`);
        await queryRunner.query(`ALTER TABLE "attribute_value" DROP CONSTRAINT "FK_123ac30d8ade936347e4099cc4a"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP CONSTRAINT "FK_40ca0cd115ef1ff35351bed8da2"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_8bf3257f3efd245c9f292c169c5"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_8f2bb52a4384d2d5f1ff59fb9e6"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_4191531f6a2174e137f5d448645"`);
        await queryRunner.query(`ALTER TABLE "shipping" DROP CONSTRAINT "FK_a36ba189b1d8e809dc1ad5d23e3"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_148f242733fba9b734a4cdc8772"`);
        await queryRunner.query(`DROP INDEX "IDX_11da9decc6d053c89b14825abe"`);
        await queryRunner.query(`DROP INDEX "IDX_4c04930e4573b49ab28a4600da"`);
        await queryRunner.query(`DROP TABLE "category_closure"`);
        await queryRunner.query(`DROP INDEX "IDX_02d2d1bd2127e4d54302549fef"`);
        await queryRunner.query(`DROP INDEX "IDX_6ae9fd1960af2eb3b290036c1c"`);
        await queryRunner.query(`DROP TABLE "category_attribute"`);
        await queryRunner.query(`DROP INDEX "IDX_c1bf4950dee394db4b9cad0607"`);
        await queryRunner.query(`DROP INDEX "IDX_c0d597555330c0a972122bf467"`);
        await queryRunner.query(`DROP TABLE "product_attribute"`);
        await queryRunner.query(`DROP TABLE "attribute_value"`);
        await queryRunner.query(`DROP TABLE "attribute"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_image"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction_method"`);
        await queryRunner.query(`DROP TABLE "shipping"`);
        await queryRunner.query(`DROP TABLE "shipping_method"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "cart_item"`);
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
