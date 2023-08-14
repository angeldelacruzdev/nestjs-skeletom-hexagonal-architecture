import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, CommonModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
