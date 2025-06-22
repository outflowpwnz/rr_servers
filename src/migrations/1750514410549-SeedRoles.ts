import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedRoles1750514410549 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      INSERT INTO role (name)
      VALUES ('developer'), ('tester');
    `)  
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
