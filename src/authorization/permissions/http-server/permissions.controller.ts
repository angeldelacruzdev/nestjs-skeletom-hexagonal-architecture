import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { CreatePermissionDocDto, PermissionsReponseDocDto } from './dto';
import {
  CreatePermissionUseCase,
  DeletePermissionsUseCase,
  FindPermissionsUseCase,
  UpdatePermissionsUseCase,
} from '../application';
import { Pagination } from '../../../common';
import { PaginationDocDto } from '../../../utils/dto/pagination-doc.dto';
import { PaginationResponseDto } from '../../../utils';

@Controller({
  path: 'v1/permissions',
  version: VERSION_NEUTRAL,
})
export class PermissionsController {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase,
    private readonly findPermissionsUseCase: FindPermissionsUseCase,
    private readonly updatePermissionsUseCase: UpdatePermissionsUseCase,
    private readonly deletePermissionsUseCase: DeletePermissionsUseCase,
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
  ): Promise<PaginationResponseDto<PermissionsReponseDocDto> | null> {
    return await this.findPermissionsUseCase.findMany(pagination);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<PermissionsReponseDocDto | null> {
    return await this.findPermissionsUseCase.findOne(id);
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() dto: CreatePermissionDocDto,
  ): Promise<PermissionsReponseDocDto | null> {
    return await this.updatePermissionsUseCase.update(id, dto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<boolean | null> {
    return await this.deletePermissionsUseCase.delete(id);
  }
}
