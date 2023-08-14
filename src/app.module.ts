import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, CommonModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: AtGuard,
  }, AppService],
})
export class AppModule { }
