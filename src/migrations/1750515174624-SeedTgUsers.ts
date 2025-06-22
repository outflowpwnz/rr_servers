import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedTgUsers1750515174624 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            INSERT INTO tg_user (name, tgId, roleId) VALUES ('olegthegoodboy', 633913380, 1);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
