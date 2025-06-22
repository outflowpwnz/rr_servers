import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedMessages1750515954638 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      INSERT INTO message (text)
      VALUES ('Проверь, все ли закоммичено и запушено!');
    `)  
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
