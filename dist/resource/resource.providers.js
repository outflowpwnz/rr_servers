"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceProviders = exports.RESOURCE_REPOSITORY = void 0;
const resource_entity_1 = require("./resource.entity");
exports.RESOURCE_REPOSITORY = 'RESOURCE_REPOSITORY';
exports.resourceProviders = [
    {
        provide: exports.RESOURCE_REPOSITORY,
        useFactory: (dataSource) => dataSource.getRepository(resource_entity_1.Resource),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=resource.providers.js.map