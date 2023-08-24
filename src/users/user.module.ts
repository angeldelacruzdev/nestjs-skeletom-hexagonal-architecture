import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { provideres } from './providers';

import { User } from './domain/entities/user.entity';
import { UserDetails } from './domain/entities/user-details.entity';

import { UserController } from './http-server';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserDetails])],
  providers: [...provideres],
  controllers: [UserController],
})
export class UserModule {}
