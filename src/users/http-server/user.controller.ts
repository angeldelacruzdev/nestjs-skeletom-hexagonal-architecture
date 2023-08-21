import {
  Controller,
  Get,
  Post,
  Param,
  VERSION_NEUTRAL,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  FindUserUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUserCase,
} from '../application';
import { CreateUserDto, UpdateUserServerDto, UserResponseDto } from './dtos';

@Controller({
  path: 'v1/users',
  version: VERSION_NEUTRAL,
})
export class UserController {
  constructor(
    private readonly findUserUseCase: FindUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUseCase: DeleteUserUserCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return await this.createUserUseCase.create(dto);
  }

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    return await this.findUserUseCase.findAll();
  }

  @Get(':id')
  async findUserByid(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.findUserUseCase.findUserByid(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserServerDto,
  ): Promise<UserResponseDto> {
    return await this.updateUserUseCase.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.deleteUseCase.delete(id);
  }
}
