import { EXCEPTION_HANDLER_PORT, ExceptionHandlerPort } from "./../../../common/exceptions";
import { Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginDto, LoginRepositoryPort, LoginResponseDto } from "./../../../auth/application";
import { Repository } from "typeorm";
import { UserEntity } from "./../../../users/domain";
import { FindUserRepositoryAdapter } from "../../../users/infrastructure";

export class LoginRepositoryAdapter implements LoginRepositoryPort {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @Inject(EXCEPTION_HANDLER_PORT)
        private readonly exceptionHandler: ExceptionHandlerPort,
    ) { }


    async login(dto: LoginDto): Promise<LoginResponseDto> {
        try {

            throw new Error("Method not implemented.");
        } catch (error) {
            return this.exceptionHandler.handle(error)
        }
    }
}