import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';
const table = 'admin.users';
export class AddUserIndices1691988403497 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      table,
      new TableIndex({
        name: 'idx_username',
        columnNames: ['username'],
      }),
    );

    await queryRunner.createIndex(
      table,
      new TableIndex({
        name: 'idx_email',
        columnNames: ['email'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(table, 'idx_username');
    await queryRunner.dropIndex(table, 'idx_email');
  }
}
