import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1691752766484 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'admin.users',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
          },
          { name: 'username', type: 'varchar', length: '50' },
          { name: 'email', type: 'varchar', length: '100', isNullable: false },
          { name: 'password', type: 'varchar', length: '100' },
          { name: 'rt_hash', type: 'varchar', length: '100' },
          { name: 'is_admin', type: 'boolean', default: false },
          { name: 'status', type: 'boolean', default: true },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('admin.users');
  }
}
