import { query } from 'express';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRolesPermissionsTable1695413541348
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'security.role_permissions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'role_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'permission_id',
            type: 'int',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_ROLE_PERMISSION_ROLE_ID',
            columnNames: ['role_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'security.roles',
          },
          {
            name: 'FK_ROLE_PERMISSION_PERMISSION_ID',
            columnNames: ['permission_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'security.permissions',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('security.role_permissions');
  }
}
