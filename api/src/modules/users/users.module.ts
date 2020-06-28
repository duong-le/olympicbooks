import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from 'src/shared/Guards/roles.guard';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class UsersModule {}
