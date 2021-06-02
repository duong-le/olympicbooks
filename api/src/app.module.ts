import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminsModule } from './controllers/admin/admins/admins.module';
import { AdminCategoriesModule } from './controllers/admin/categories/categories.module';
import { AdminCustomersModule } from './controllers/admin/customers/customers.module';
import { AdminOrdersModule } from './controllers/admin/orders/orders.module';
import { AdminProductsModule } from './controllers/admin/products/products.module';
import { AdminSellersModule } from './controllers/admin/sellers/sellers.module';
import { AdminShopsModule } from './controllers/admin/shops/shops.module';

import { AuthModule } from './controllers/auth/auth.module';
import { CartsModule } from './controllers/store/carts/carts.module';
import { CategoriesModule } from './controllers/store/categories/categories.module';
import { CustomersModule } from './controllers/store/customers/customers.module';
import { DiscountsModule } from './controllers/store/discounts/discounts.module';
import { OrdersModule } from './controllers/store/orders/orders.module';
import { ProductsModule } from './controllers/store/products/products.module';
import { ShippingsModule } from './controllers/store/shippings/shippings.module';
import { TransactionsModule } from './controllers/store/transactions/transactions.module';
import { ShopsModule } from './controllers/store/shops/shops.module';

import { SellersModule } from './controllers/seller/sellers/sellers.module';
import { SellerCategoriesModule } from './controllers/seller/categories/categories.module';
import { SellerShopsModule } from './controllers/seller/shops/shops.module';
import { ShopProductsModule } from './controllers/seller/products/products.module';
import { ShopOrdersModule } from './controllers/seller/orders/orders.module';

import OrmConfig from './core/Config/orm.config';
import { RolesGuard } from './core/Guards/roles.guard';
import { HttpRequestLogger } from './core/Loggers/http-request.logger';
import { ArrayExist } from './core/Validators/array-exist/array-exist.service';
import { Exist } from './core/Validators/exist/exist.service';

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
    DiscountsModule,
    TransactionsModule,
    ShippingsModule,
    ShopsModule,
    AdminsModule,
    AdminOrdersModule,
    AdminCategoriesModule,
    AdminProductsModule,
    AdminCustomersModule,
    AdminShopsModule,
    AdminSellersModule,
    SellersModule,
    SellerCategoriesModule,
    SellerShopsModule,
    ShopProductsModule,
    ShopOrdersModule
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
