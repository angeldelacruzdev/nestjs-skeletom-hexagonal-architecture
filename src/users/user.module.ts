import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CreateUserRepositoryAdapter,
  FindUserRepositoryAdapter,
  UpdateUserRepositoryAdapter,
} from './infrastructure';
import {
  CreateUserRepositoryPort,
  CreateUserUseCase,
  FindUserUseCase,
  CREATE_REPOSITORY_PORT,
  FIND_REPOSITORY_PORT,
  FindUserRepositoryPort,
  UPDATE_USER_REPOSITORY_PORT,
  UpdateUserUseCase,
  UpdateUserRepository,
  DELETE_USER_REPOSITORY_PORT,
  DeleteUserUserCase,
} from './application';
import { UserController } from './http-server/user.controller';
import { UserEntity } from './domain/entities';
import {
  EXCEPTION_HANDLER_PORT,
  ExceptionHandlerPort,
  NestjsExceptionHandlerAdapter,
} from '../common/exceptions';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: EXCEPTION_HANDLER_PORT,
      useClass: NestjsExceptionHandlerAdapter, // Provee el manejador de excepciones
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
      provide: UPDATE_USER_REPOSITORY_PORT,
      useClass: UpdateUserRepositoryAdapter,
    },
    {
      provide: DELETE_USER_REPOSITORY_PORT,
      useClass: UpdateUserRepositoryAdapter,
    },
    {
      provide: FindUserUseCase,
      useFactory: (findUserRepositoryPort: FindUserRepositoryPort) =>
        new FindUserUseCase(findUserRepositoryPort),
      inject: [FIND_REPOSITORY_PORT],
    },
    {
      provide: CreateUserUseCase,
      useFactory: (createRepository: CreateUserRepositoryPort) =>
        new CreateUserUseCase(createRepository),
      inject: [CREATE_REPOSITORY_PORT],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (createRepository: UpdateUserRepository) =>
        new UpdateUserUseCase(createRepository),
      inject: [UPDATE_USER_REPOSITORY_PORT],
    },
    {
      provide: DeleteUserUserCase,
      useFactory: (createRepository: UpdateUserRepository, findUserRepositoryPort: FindUserRepositoryPort, exceptionHandlerPort: ExceptionHandlerPort) => {
        const findUserUseCase = new FindUserUseCase(findUserRepositoryPort)
        return new DeleteUserUserCase(createRepository, findUserUseCase, exceptionHandlerPort)
      },
      inject: [UPDATE_USER_REPOSITORY_PORT, FIND_REPOSITORY_PORT, EXCEPTION_HANDLER_PORT],
    },
  ],
  controllers: [UserController],
})
export class UserModule { }
