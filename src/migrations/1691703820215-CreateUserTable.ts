import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserTable1691703820215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'username', type: 'varchar', length: '50' },
                { name: 'email', type: 'varchar', length: '100' },
                { name: 'password', type: 'varchar', length: '100' },
                { name: 'rt_hash', type: 'varchar', length: '100' },
                // Otros campos según sea necesario
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
