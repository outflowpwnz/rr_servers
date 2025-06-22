"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleProviders = exports.ROLE_REPOSITORY = void 0;
const role_entity_1 = require("./role.entity");
exports.ROLE_REPOSITORY = 'ROLE_REPOSITORY';
exports.roleProviders = [
    {
        provide: exports.ROLE_REPOSITORY,
        useFactory: (dataSource) => dataSource.getRepository(role_entity_1.Role),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=role.providers.js.map