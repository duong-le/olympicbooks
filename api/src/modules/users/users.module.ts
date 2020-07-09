import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UsersService]
})
export class UsersModule {}
