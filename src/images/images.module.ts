import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './domain/image.entity';
import { provideres } from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [...provideres],
  exports: [...provideres],
  controllers: [],
})
export class UserModule {}
