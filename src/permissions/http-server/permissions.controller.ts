import { Body, Controller, Get, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { CreatePermissionDocDto, PermissionsReponseDocDto } from './dto';
import {
  CreatePermissionUseCase,
  FindPermissionsUseCase,
} from '../application';
import { Pagination } from '../../common';
import { PaginationDocDto } from '../../utils/dto/pagination-doc.dto';
import { PaginationResponseDto } from '../../utils';

@Controller({
  path: 'v1/permissions',
  version: VERSION_NEUTRAL,
})
export class PermissionsController {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase,
    private readonly findPermissionsUseCase: FindPermissionsUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreatePermissionDocDto,
  ): Promise<PermissionsReponseDocDto> {
    return await this.createPermissionUseCase.create(dto);
  }

  @Get()
  async findMany(
    @Pagination() pagination: PaginationDocDto,
  ): Promise<PaginationResponseDto<PermissionsReponseDocDto>> {
    return await this.findPermissionsUseCase.findMany(pagination);
  }
}
