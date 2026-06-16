import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { providers } from './providers';

import { User } from './infrastructure/entities/user.entity';
import { UserDetails } from './infrastructure/entities/user-details.entity';

import { UserController } from './http-server';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserDetails])],
  providers: [...providers],
  controllers: [UserController],
})
export class UserModule {}
