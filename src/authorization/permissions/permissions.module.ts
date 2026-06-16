import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Permission } from './infrastructure/entities/permission.entity';
import { providers } from './providers';
import { PermissionsController } from './http-server';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [...providers],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
