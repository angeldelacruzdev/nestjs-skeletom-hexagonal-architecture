import { Body, Controller, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { CreatePermissionDocDto, PermissionsReponseDocDto } from './dto';

@Controller({
  path: 'v1/permissions',
  version: VERSION_NEUTRAL,
})
export class PermissionsController {
  constructor() {}

  @Post()
  async create(
    @Body() dto: CreatePermissionDocDto,
  ): Promise<PermissionsReponseDocDto> {
    return;
  }
}
