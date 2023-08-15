import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AT_STRATEGIEST, LOGIN_USER_REPOSITORY, LoginRepositoryPort, LoginUseCase, RT_STRATEGIEST } from './application';
import { AtStrategiest, RtStrategiest } from '../jwt/strategies';
import { AuthController } from './http-server/auth.controller';
import { LoginRepositoryAdapter } from './infrastructure/adapters/login-repository.adapter';
import { EXCEPTION_HANDLER_PORT, ExceptionHandlerPort, NestjsExceptionHandlerAdapter } from './../common/exceptions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './../users/domain';
import { FIND_REPOSITORY_PORT, FindUserRepositoryPort, FindUserUseCase } from './../users/application';
import { FindUserRepositoryAdapter } from './../users/infrastructure';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.SECRET,
            })
        }),
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [
        {
            provide: EXCEPTION_HANDLER_PORT,
            useClass: NestjsExceptionHandlerAdapter, // Provee el manejador de excepciones
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
            useClass: LoginRepositoryAdapter
        },
        {
            provide: FIND_REPOSITORY_PORT,
            useClass: FindUserRepositoryAdapter,
        },
        {
            provide: LoginUseCase,
            useFactory: (loginRepostory: LoginRepositoryPort, findUserRepositoryPort: FindUserRepositoryPort, exceptionHandlerPort: ExceptionHandlerPort) => {
                const findUserUseCase = new FindUserUseCase(findUserRepositoryPort)
                return new LoginUseCase(loginRepostory, findUserUseCase, exceptionHandlerPort)
            },
            inject: [LOGIN_USER_REPOSITORY, FIND_REPOSITORY_PORT, EXCEPTION_HANDLER_PORT],
        },
    ],
    controllers: [AuthController]
})
export class AuthModule { }