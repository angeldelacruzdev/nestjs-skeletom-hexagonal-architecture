import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateUsersTable1691752766484 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth.user',
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true, isGenerated: true, generationStrategy: 'uuid' },
          { name: 'email', type: 'varchar', length: '150', isUnique: true },
          { name: 'password', type: 'text' }
        ],
      }),
      true
    );

    await queryRunner.createIndex(
      'auth.user',
      new TableIndex({
        name: 'IDX_USER_EMAIL',
        columnNames: ['email']
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('auth.user', 'IDX_EMAIL');
    await queryRunner.dropTable('auth.user');
  }
}
