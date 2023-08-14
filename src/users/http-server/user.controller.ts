import {
  Controller,
  Get,
  Post,
  Param,
  VERSION_NEUTRAL,
  Body,
  Put,
  ParseFloatPipe,
  Delete,
} from '@nestjs/common';
import {
  FindUserUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
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
    @Param('id', ParseFloatPipe) id: number,
    @Body() dto: UpdateUserServerDto,
  ): Promise<boolean> {
    return await this.updateUserUseCase.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseFloatPipe) id: number): Promise<boolean> {
    return;
  }
}
