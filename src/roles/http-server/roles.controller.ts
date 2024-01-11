import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { CreateRolesDocDto, RolesReponseDocDto } from './dtos';

import { Pagination } from '../../common';
import { PaginationDocDto } from '../../utils/dto/pagination-doc.dto';
import { PaginationResponseDto } from '../../utils';

import { PermissionsIdsDocDto } from '../../permissions/http-server';
import {
  AssignPermissionsToRoleUseCase,
  CreateRolesUseCase,
  FindRolesUseCase,
  RolesResponseDto,
} from '../application';

@Controller({
  path: 'v1/roles',
  version: VERSION_NEUTRAL,
})
export class RolesController {
  constructor(
    private readonly createRolesUseCase: CreateRolesUseCase,
    private readonly findRolesUseCase: FindRolesUseCase,
    private readonly assignPermissionsToRoleUseCase: AssignPermissionsToRoleUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateRolesDocDto): Promise<RolesReponseDocDto> {
    return await this.createRolesUseCase.create(body);
  }

  @Get()
  async findMany(
    @Pagination() pagination: PaginationDocDto,
  ): Promise<PaginationResponseDto<RolesResponseDto>> {
    return await this.findRolesUseCase.findMany(pagination);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RolesReponseDocDto> {
    return await this.findRolesUseCase.findOne(id);
  }

  @Get(':id/assign-permissions')
  async assignPermissions(
    @Param('id') id: number,
    @Body() { permissionIds }: PermissionsIdsDocDto,
  ): Promise<RolesReponseDocDto> {
    return await this.assignPermissionsToRoleUseCase.assignPermissionsToRole(
      id,
      permissionIds,
    );
  }
}
