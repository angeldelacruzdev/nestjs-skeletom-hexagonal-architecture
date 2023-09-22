import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserRolesTable1695414521717 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'security.user_roles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isUnique: true, // Asegura que cada usuario tenga un único rol
          },
          {
            name: 'role_id',
            type: 'int',
            isUnique: true, // Asegura que cada rol esté asignado a un único usuario
          },
        ],
        foreignKeys: [
          {
            name: 'FK_USER_ROLE_USER_ID',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'auth.user',
          },
          {
            name: 'FK_USER_ROLE_ROLE_ID',
            columnNames: ['role_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'security.roles',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('security.user_roles');
  }
}
