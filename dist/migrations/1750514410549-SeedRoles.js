"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedRoles1750514410549 = void 0;
class SeedRoles1750514410549 {
    async up(queryRunner) {
        queryRunner.query(`
      INSERT INTO role (name)
      VALUES ('developer'), ('tester');
    `);
    }
    async down(queryRunner) {
    }
}
exports.SeedRoles1750514410549 = SeedRoles1750514410549;
//# sourceMappingURL=1750514410549-SeedRoles.js.map