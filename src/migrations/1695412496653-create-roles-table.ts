import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateRolesTable1695412496653 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'security.roles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          { name: 'name', type: 'varchar', length: '50', isUnique: true },
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
      'security.roles',
      new TableIndex({
        columnNames: ['name'],
        name: 'IDX_ROLE_NAME',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('security.roles', 'IDX_ROLE_NAME');
    await queryRunner.dropTable('security.roles');
  }
}
