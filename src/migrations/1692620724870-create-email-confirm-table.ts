import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateEmailConfirmTable1692620724870
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth.email_confirm',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'userId', type: 'uuid' },
          { name: 'email', type: 'varchar', length: '100' },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_EMAIL_CONFIRM_USER_ID',
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            referencedSchema: 'auth',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'auth.email_confirm',
      new TableIndex({
        name: 'IDX_EMAILL_CONFIRM',
        columnNames: ['email'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('auth.email_confirm', 'IDX_EMAILL_CONFIRM');
    await queryRunner.dropForeignKey(
      'auth.email_confirm',
      'FK_EMAIL_CONFIRM_USER_ID',
    );
    await queryRunner.dropTable('auth.email_confirm');
  }
}
