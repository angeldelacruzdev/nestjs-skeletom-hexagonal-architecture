import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUsersTable1691752766484 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth.users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'email', type: 'varchar', length: '100', isUnique: true },
          { name: 'password', type: 'text' },
          { name: 'rt_hash', type: 'text' },
          { name: 'terms', type: 'boolean', default: false },
          { name: 'status', type: 'boolean', default: false },
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
      'auth.users',
      new TableIndex({
        name: 'IDX_USER_EMAIL',
        columnNames: ['email'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('auth.users', 'IDX_USER_EMAIL');
    await queryRunner.dropTable('auth.users');
  }
}
