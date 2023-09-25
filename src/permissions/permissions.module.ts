import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
 
import { Permission } from './domain/permission.entity';
import { providers } from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [...providers],
  controllers: [],
})
export class RolesModule {}
