import { UserRepositoryPort } from "../ports";

export class FindUserUseCase {
    constructor(
        private readonly userRepository: UserRepositoryPort
    ) { }

    async execute(id: string): Promise<any> {
        return await this.userRepository.findUserByid(id)
    }
}