import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { providers } from './providers';
import { Role } from './domain/entities/roles.entity';
import { RolesController } from './http-server';
import { Permission } from '../permissions/domain/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  providers: [...providers],
  controllers: [RolesController],
})
export class RolesModule {}
