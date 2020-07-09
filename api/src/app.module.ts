import { APP_GUARD } from '@nestjs/core';
import { Module, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
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
import { SqlFormat } from './shared/Loggers/sql-format.logger';
import morgan from 'morgan';
import { RolesGuard } from 'src/shared/Guards/roles.guard';
import { Exist } from './shared/Validators/exist/exist.service';
import { ArrayExist } from './shared/Validators/array-exist/array-exist.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SQL_HOST,
      port: 5432,
      username: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_NAME,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      logger: new SqlFormat(['schema', 'error', 'warn', 'info', 'log', 'migration'])
    }),
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
    Logger,
    Exist,
    ArrayExist,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule implements NestModule {
  constructor(private logger: Logger) {}

  configure(consumer: MiddlewareConsumer): void {
    if (process.env.NODE_ENV !== 'PRODUCTION') {
      consumer
        .apply(morgan('dev', { stream: { write: (message) => this.logger.log(message.substring(0, message.lastIndexOf('\n')), 'HTTP Request') } }))
        .forRoutes('*');
    }
  }
}
