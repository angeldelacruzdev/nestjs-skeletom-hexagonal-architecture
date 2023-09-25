import { Body, Controller, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { CreateRolesDocDto } from './dtos';
import { CreateRolesUseCase } from '../application/use-case';

@Controller({
  path: 'v1/roles',
  version: VERSION_NEUTRAL,
})
export class RolesController {
  constructor(private readonly createRolesUseCase: CreateRolesUseCase) {}

  @Post()
  async create(@Body() body: CreateRolesDocDto): Promise<any> {
    return await this.createRolesUseCase.create(body);
  }
}
