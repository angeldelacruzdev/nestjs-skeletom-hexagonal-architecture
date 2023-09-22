import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSecuritySchema1695411944283 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA security`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA security`);
  }
}
