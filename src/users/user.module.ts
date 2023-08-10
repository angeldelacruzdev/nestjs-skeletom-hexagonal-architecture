import { Module } from "@nestjs/common";
import { UserRepositoryAdapter } from "./infrastructure";
import { FindUserUseCase, USER_REPOSITORY_PORT, UserRepositoryPort } from "./application";
import { UserController } from "./http-server/user.controller";


@Module({
    providers: [
        {
            provide: USER_REPOSITORY_PORT,
            useClass: UserRepositoryAdapter,
        },
        {
            provide: FindUserUseCase,
            useFactory: (userRepository: UserRepositoryPort) => new FindUserUseCase(userRepository),
            inject: [USER_REPOSITORY_PORT]
        }
    ],
    controllers: [UserController],
})
export class UserModule { }