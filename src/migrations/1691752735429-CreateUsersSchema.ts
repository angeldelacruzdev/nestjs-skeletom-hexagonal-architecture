import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersSchema1691752735429 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA admin`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA admin`);
  }
}
