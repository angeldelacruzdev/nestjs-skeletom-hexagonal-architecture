import { Body, Controller, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { CreatePermissionDocDto, PermissionsReponseDocDto } from './dto';
import { CreatePermissionUseCase } from '../application';

@Controller({
  path: 'v1/permissions',
  version: VERSION_NEUTRAL,
})
export class PermissionsController {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreatePermissionDocDto,
  ): Promise<PermissionsReponseDocDto> {
    return await this.createPermissionUseCase.create(dto);
  }
}
