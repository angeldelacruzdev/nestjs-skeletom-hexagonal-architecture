import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AT_STRATEGIEST,
  AuthRepositoryPort,
  LOGIN_USER_REPOSITORY,
  AuthUseCase,
  RT_STRATEGIEST,
  RegisterRepositoryPort,
} from './application';

import { AtStrategiest, RtStrategiest } from '../jwt/strategies';
import { AuthController } from './http-server/auth.controller';
import { AuthRepositoryAdapter } from './infrastructure/adapters/auth-repository.adapter';

import {
  CREATE_REPOSITORY_PORT,
  FIND_REPOSITORY_PORT,
  FindUserRepositoryPort,
  FindUserUseCase,
} from './../users/application';

import {
  CreateUserRepositoryAdapter,
  FindUserRepositoryAdapter,
} from './../users/infrastructure';

import { User } from './../users/domain/entities/user.entity';
import { UserDetails } from './../users/domain/entities/user-details.entity';
import { RegisterUseCase } from './application/use-case/register.use-case';
import { REGISTER_USER_REPOSITORY } from './application/token/auth-repository-token';
import { RegisterRepositoryAdapter } from './infrastructure/adapters/register-repository.adapter';
import {
  EXCEPTION_HANDLER_PORT,
  ExceptionHandlerPort,
  NestjsExceptionHandlerAdapter,
} from '../common';
import { LoggerAdapter, LoggerPort, TOKEN_LOGGER_PORT } from '../utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserDetails]),
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.SECRET,
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  providers: [
    {
      provide: EXCEPTION_HANDLER_PORT,
      useClass: NestjsExceptionHandlerAdapter,
    },
    {
      provide: TOKEN_LOGGER_PORT,
      useClass: LoggerAdapter,
    },
    {
      provide: AT_STRATEGIEST,
      useClass: RtStrategiest,
    },
    {
      provide: RT_STRATEGIEST,
      useClass: AtStrategiest,
    },
    {
      provide: LOGIN_USER_REPOSITORY,
      useClass: AuthRepositoryAdapter,
    },
    {
      provide: FIND_REPOSITORY_PORT,
      useClass: FindUserRepositoryAdapter,
    },
    {
      provide: CREATE_REPOSITORY_PORT,
      useClass: CreateUserRepositoryAdapter,
    },
    {
      provide: REGISTER_USER_REPOSITORY,
      useClass: RegisterRepositoryAdapter,
    },

    {
      provide: AuthUseCase,
      useFactory: (
        repository: AuthRepositoryPort,
        findUserRepositoryPort: FindUserRepositoryPort,
        exceptionHandlerPort: ExceptionHandlerPort,
        loggerPort: LoggerPort,
      ) => {
        const findUserUseCase = new FindUserUseCase(findUserRepositoryPort);
        return new AuthUseCase(
          repository,
          findUserUseCase,
          exceptionHandlerPort,
          loggerPort,
        );
      },
      inject: [
        LOGIN_USER_REPOSITORY,
        FIND_REPOSITORY_PORT,
        EXCEPTION_HANDLER_PORT,
        TOKEN_LOGGER_PORT,
      ],
    },
    {
      provide: RegisterUseCase,
      useFactory: (registerRepositoryPort: RegisterRepositoryPort) => {
        return new RegisterUseCase(registerRepositoryPort);
      },
      inject: [REGISTER_USER_REPOSITORY, EXCEPTION_HANDLER_PORT],
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
