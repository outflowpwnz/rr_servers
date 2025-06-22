"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedMessages1750515954638 = void 0;
class SeedMessages1750515954638 {
    async up(queryRunner) {
        queryRunner.query(`
      INSERT INTO message (text)
      VALUES ('Проверь, все ли закоммичено и запушено!');
    `);
    }
    async down(queryRunner) {
    }
}
exports.SeedMessages1750515954638 = SeedMessages1750515954638;
//# sourceMappingURL=1750515954638-SeedMessages.js.map