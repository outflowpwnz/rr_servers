"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tgUserProviders = exports.TG_USER_REPOSITORY = void 0;
const tg_user_entity_1 = require("./tg-user.entity");
exports.TG_USER_REPOSITORY = 'TG_USER_REPOSITORY';
exports.tgUserProviders = [
    {
        provide: exports.TG_USER_REPOSITORY,
        useFactory: (dataSource) => dataSource.getRepository(tg_user_entity_1.TgUser),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=tg-user.providers.js.map