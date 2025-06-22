"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageProviders = exports.MESSAGE_REPOSITORY = void 0;
const message_entity_1 = require("./message.entity");
exports.MESSAGE_REPOSITORY = 'MESSAGE_REPOSITORY';
exports.messageProviders = [
    {
        provide: exports.MESSAGE_REPOSITORY,
        useFactory: (dataSource) => dataSource.getRepository(message_entity_1.Message),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=message.providers.js.map