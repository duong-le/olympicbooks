import { APP_GUARD } from '@nestjs/core';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { ormConfig } from './ormconfig';
import { HttpRequestLogger } from './shared/Loggers/http-request.logger';

import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { PublishersModule } from './modules/publishers/publishers.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { UsersModule } from './modules/users/users.module';
import { CartsModule } from './modules/carts/carts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { DiscountsModule } from './modules/discounts/discounts.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { ShippingsModule } from './modules/shippings/shippings.module';

import { RolesGuard } from 'src/shared/Guards/roles.guard';
import { Exist } from './shared/Validators/exist/exist.service';
import { ArrayExist } from './shared/Validators/array-exist/array-exist.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormConfig),
    MulterModule.register(),
    AuthModule,
    ProductsModule,
    CategoriesModule,
    PublishersModule,
    AuthorsModule,
    UsersModule,
    CartsModule,
    OrdersModule,
    DiscountsModule,
    TransactionsModule,
    ShippingsModule
  ],
  providers: [
    Exist,
    ArrayExist,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    if (process.env.NODE_ENV !== 'PRODUCTION') {
      consumer.apply(HttpRequestLogger).forRoutes('*');
    }
  }
}
