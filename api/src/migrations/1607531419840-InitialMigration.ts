import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1607531419840 implements MigrationInterface {
    name = 'InitialMigration1607531419840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "imgUrl" character varying, "imgName" character varying, "key" integer DEFAULT null, "expanded" boolean NOT NULL DEFAULT true, "mpath" character varying DEFAULT '', "parentId" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "discount" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying NOT NULL, "voucherCode" character varying NOT NULL, "discountValue" integer NOT NULL, "minOrderValue" integer NOT NULL DEFAULT '0', "validFrom" TIMESTAMP NOT NULL, "validUntil" TIMESTAMP NOT NULL, CONSTRAINT "UQ_d3dfa9396d6f366b3fee877808d" UNIQUE ("voucherCode"), CONSTRAINT "PK_d05d8712e429673e459e7f1cddb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipping_method" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying DEFAULT null, "description" character varying NOT NULL, "fee" integer NOT NULL, "disabled" boolean NOT NULL, CONSTRAINT "PK_b9b0adfad3c6b99229c1e7d4865" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shipping" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying DEFAULT null, "address" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "state" character varying NOT NULL DEFAULT 'PROCESSING', "code" character varying DEFAULT null, "fee" integer NOT NULL DEFAULT '0', "deliveryDate" TIMESTAMP DEFAULT null, "shippingMethodId" integer NOT NULL, CONSTRAINT "PK_0dc6ac92ee9cbc2c1611d77804c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_method" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying DEFAULT null, "description" character varying NOT NULL, "info" character varying DEFAULT null, "disabled" boolean NOT NULL, CONSTRAINT "PK_46299cdd290767885705d0645a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "transactionMethodId" integer NOT NULL, "state" character varying NOT NULL DEFAULT 'PENDING', "value" integer NOT NULL, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_item" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "quantity" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "UQ_c605dd3a08f85dcb5a656b7299d" UNIQUE ("userId", "productId"), CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "hashedPassword" character varying NOT NULL, "address" character varying DEFAULT null, "phoneNumber" character varying DEFAULT null, "isBlock" boolean NOT NULL DEFAULT false, "role" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "buyerNote" character varying DEFAULT null, "sellerNote" character varying DEFAULT null, "userId" integer NOT NULL, "discountId" integer DEFAULT null, "transactionId" integer NOT NULL, "shippingId" integer NOT NULL, CONSTRAINT "REL_8f2bb52a4384d2d5f1ff59fb9e" UNIQUE ("transactionId"), CONSTRAINT "REL_8bf3257f3efd245c9f292c169c" UNIQUE ("shippingId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "quantity" integer NOT NULL, "totalValue" integer NOT NULL, "orderId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "publisher" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_70a5936b43177f76161724da3e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_image" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "imgUrl" character varying, "imgName" character varying, "productId" integer, CONSTRAINT "PK_99d98a80f57857d51b5f63c8240" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "publicationYear" integer NOT NULL, "pages" integer NOT NULL, "weight" integer DEFAULT null, "price" integer NOT NULL, "originalPrice" integer NOT NULL, "description" character varying NOT NULL, "inStock" boolean NOT NULL DEFAULT true, "categoryId" integer NOT NULL, "publisherId" integer NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_authors" ("productId" integer NOT NULL, "authorId" integer NOT NULL, CONSTRAINT "PK_e1460f0ba9b670f3012cd7aad96" PRIMARY KEY ("productId", "authorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ebcaa3d7ed5ee03d3a9401daf9" ON "products_authors" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ff33c5d49ec6a4412fd2b8b4a5" ON "products_authors" ("authorId") `);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10" FOREIGN KEY ("parentId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shipping" ADD CONSTRAINT "FK_a36ba189b1d8e809dc1ad5d23e3" FOREIGN KEY ("shippingMethodId") REFERENCES "shipping_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_4191531f6a2174e137f5d448645" FOREIGN KEY ("transactionMethodId") REFERENCES "transaction_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_158f0325ccf7f68a5b395fa2f6a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item" ADD CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_4c1bbd44f6614bf518204e1d5ca" FOREIGN KEY ("discountId") REFERENCES "discount"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_8f2bb52a4384d2d5f1ff59fb9e6" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_8bf3257f3efd245c9f292c169c5" FOREIGN KEY ("shippingId") REFERENCES "shipping"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD CONSTRAINT "FK_40ca0cd115ef1ff35351bed8da2" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_826d2d490a78e9439c3538c26df" FOREIGN KEY ("publisherId") REFERENCES "publisher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_authors" ADD CONSTRAINT "FK_ebcaa3d7ed5ee03d3a9401daf94" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_authors" ADD CONSTRAINT "FK_ff33c5d49ec6a4412fd2b8b4a5f" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_authors" DROP CONSTRAINT "FK_ff33c5d49ec6a4412fd2b8b4a5f"`);
        await queryRunner.query(`ALTER TABLE "products_authors" DROP CONSTRAINT "FK_ebcaa3d7ed5ee03d3a9401daf94"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_826d2d490a78e9439c3538c26df"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP CONSTRAINT "FK_40ca0cd115ef1ff35351bed8da2"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_8bf3257f3efd245c9f292c169c5"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_8f2bb52a4384d2d5f1ff59fb9e6"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_4c1bbd44f6614bf518204e1d5ca"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_75db0de134fe0f9fe9e4591b7bf"`);
        await queryRunner.query(`ALTER TABLE "cart_item" DROP CONSTRAINT "FK_158f0325ccf7f68a5b395fa2f6a"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_4191531f6a2174e137f5d448645"`);
        await queryRunner.query(`ALTER TABLE "shipping" DROP CONSTRAINT "FK_a36ba189b1d8e809dc1ad5d23e3"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_d5456fd7e4c4866fec8ada1fa10"`);
        await queryRunner.query(`DROP INDEX "IDX_ff33c5d49ec6a4412fd2b8b4a5"`);
        await queryRunner.query(`DROP INDEX "IDX_ebcaa3d7ed5ee03d3a9401daf9"`);
        await queryRunner.query(`DROP TABLE "products_authors"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "product_image"`);
        await queryRunner.query(`DROP TABLE "publisher"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "cart_item"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "transaction_method"`);
        await queryRunner.query(`DROP TABLE "shipping"`);
        await queryRunner.query(`DROP TABLE "shipping_method"`);
        await queryRunner.query(`DROP TABLE "discount"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
