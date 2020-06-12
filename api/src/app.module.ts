import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import * as morgan from 'morgan';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER_NAME,
      password: process.env.DB_USER_PASSWORD,
      database: process.env.DB_NAME,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true
    })
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(morgan('dev')).forRoutes('*');
  }
}
