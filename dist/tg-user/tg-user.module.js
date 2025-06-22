"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TgUserModule = void 0;
const common_1 = require("@nestjs/common");
const tg_user_service_1 = require("./tg-user.service");
const tg_user_controller_1 = require("./tg-user.controller");
const database_module_1 = require("../database/database.module");
const tg_user_providers_1 = require("./tg-user.providers");
let TgUserModule = class TgUserModule {
};
exports.TgUserModule = TgUserModule;
exports.TgUserModule = TgUserModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [tg_user_controller_1.TgUserController],
        providers: [
            ...tg_user_providers_1.tgUserProviders,
            tg_user_service_1.TgUserService,
        ],
        exports: [tg_user_service_1.TgUserService]
    })
], TgUserModule);
//# sourceMappingURL=tg-user.module.js.map