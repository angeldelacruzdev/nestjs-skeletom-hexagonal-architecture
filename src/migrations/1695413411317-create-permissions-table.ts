import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreatePermissionsTable1695413411317 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'security.permissions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isUnique: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'security.permissions',
      new TableIndex({
        columnNames: ['name'],
        name: 'IDX_PERMISSION_NAME',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('security.permissions', 'IDX_PERMISSION_NAME');
    await queryRunner.dropTable('security.permissions');
  }
}
