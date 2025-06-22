"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotModule = void 0;
const common_1 = require("@nestjs/common");
const bot_service_1 = require("./bot.service");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const config_1 = require("@nestjs/config");
const bot_update_1 = require("./bot.update");
const take_resource_scene_1 = require("./scenes/take-resource.scene");
const telegraf_1 = require("telegraf");
const resource_module_1 = require("../resource/resource.module");
const bot_helpers_1 = require("./bot.helpers");
const free_resource_scene_1 = require("./scenes/free-resource.scene");
const tg_user_module_1 = require("../tg-user/tg-user.module");
let BotModule = class BotModule {
};
exports.BotModule = BotModule;
exports.BotModule = BotModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_telegraf_1.TelegrafModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    token: configService.get('BOT_TOKEN'),
                    middlewares: [(0, telegraf_1.session)()],
                }),
            }),
            resource_module_1.ResourceModule,
            tg_user_module_1.TgUserModule
        ],
        providers: [
            bot_helpers_1.BotHelpers,
            bot_service_1.BotService,
            bot_update_1.BotUpdate,
            take_resource_scene_1.TakeResource,
            free_resource_scene_1.FreeResource,
        ],
    })
], BotModule);
//# sourceMappingURL=bot.module.js.map