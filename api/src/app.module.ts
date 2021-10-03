import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminsModule } from './controllers/admin/admins/admins.module';
import { AdminAttributesModule } from './controllers/admin/attributes/attributes.module';
import { AdminCategoriesModule } from './controllers/admin/categories/categories.module';
import { AdminCustomersModule } from './controllers/admin/customers/customers.module';
import { AdminOrdersModule } from './controllers/admin/orders/orders.module';
import { AdminProductsModule } from './controllers/admin/products/products.module';

import { AuthModule } from './controllers/auth/auth.module';
import { CartsModule } from './controllers/store/carts/carts.module';
import { CategoriesModule } from './controllers/store/categories/categories.module';
import { CustomersModule } from './controllers/store/customers/customers.module';
import { OrdersModule } from './controllers/store/orders/orders.module';
import { ProductsModule } from './controllers/store/products/products.module';

import OrmConfig from './core/Config/orm.config';
import { HttpRequestLogger } from './core/Loggers/http-request.logger';
import { UtilsModule } from './core/Utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(OrmConfig),
    MulterModule.register(),
    AuthModule,
    ProductsModule,
    CategoriesModule,
    CustomersModule,
    CartsModule,
    OrdersModule,
    AdminsModule,
    AdminOrdersModule,
    AdminCategoriesModule,
    AdminAttributesModule,
    AdminProductsModule,
    AdminCustomersModule,
    UtilsModule,
  ],
  providers: [
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
