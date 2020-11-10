import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { CartsModule } from './modules/carts/carts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { DiscountsModule } from './modules/discounts/discounts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { PublishersModule } from './modules/publishers/publishers.module';
import { ShippingsModule } from './modules/shippings/shippings.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { UsersModule } from './modules/users/users.module';
import { ormConfig } from './ormconfig';
import { RolesGuard } from './shared/Guards/roles.guard';
import { HttpRequestLogger } from './shared/Loggers/http-request.logger';
import { ArrayExist } from './shared/Validators/array-exist/array-exist.service';
import { Exist } from './shared/Validators/exist/exist.service';

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
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
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
