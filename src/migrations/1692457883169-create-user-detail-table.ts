import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserDetailTable1692457883169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth.user_details',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          { name: 'userId', type: 'uuid' },
          { name: 'firstName', type: 'varchar', length: '100' },
          { name: 'lastName', type: 'varchar', length: '100' },
        ],
        foreignKeys: [
          {
            name: 'FK_USER_DETAILS_USER_ID',
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            referencedSchema: 'auth',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'auth.user_details',
      'FK_USER_DETAILS_USER_ID',
    );
    await queryRunner.dropTable('auth.user_details');
  }
}
