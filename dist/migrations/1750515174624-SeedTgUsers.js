"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedTgUsers1750515174624 = void 0;
class SeedTgUsers1750515174624 {
    async up(queryRunner) {
        queryRunner.query(`
            INSERT INTO tg_user (name, tgId, roleId) VALUES ('olegthegoodboy', 633913380, 1);
        `);
    }
    async down(queryRunner) {
    }
}
exports.SeedTgUsers1750515174624 = SeedTgUsers1750515174624;
//# sourceMappingURL=1750515174624-SeedTgUsers.js.map