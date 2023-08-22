import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';

import { AtGuard } from './common/guards/at.guard';
import { AuthModule } from './auth/auth.module';
import { LoggingModule } from './app/utils/logger';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    CommonModule,
    LoggingModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    AppService,
  ],
})
export class AppModule { }
