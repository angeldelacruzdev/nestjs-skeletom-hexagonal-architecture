import { Controller, Get, Param } from '@nestjs/common';
import { FindUserUseCase } from '../application/use-case/find-user.use-case';
 
@Controller('users')
export class UserController {
    constructor(private readonly findUserUseCase: FindUserUseCase) { }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<any> {
        const user = await this.findUserUseCase.execute(id);
        // Convertir entidad a DTO y retornar
    }
}