import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/infrastructure/entities/user.entity';
import { UserDetails } from '../users/infrastructure/entities/user-details.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './http-server/auth.controller';
import { providers } from './providers';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, UserDetails]),
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.SECRET,
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  providers: providers,
  controllers: [AuthController],
})
export class AuthModule {}
