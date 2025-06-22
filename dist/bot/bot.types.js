"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACTIONS = exports.COMMANDS = exports.SCENES = void 0;
var SCENES;
(function (SCENES) {
    SCENES["TAKE_RESOURCE"] = "TAKE_RESOURCE";
    SCENES["FREE_RESOURCE"] = "FREE_RESOURCE";
})(SCENES || (exports.SCENES = SCENES = {}));
var COMMANDS;
(function (COMMANDS) {
    COMMANDS["LIST"] = "list";
    COMMANDS["START"] = "start";
    COMMANDS["CHECK_ID"] = "check_id";
    COMMANDS["BUSY_LIST"] = "busy_list";
    COMMANDS["HELP"] = "help";
})(COMMANDS || (exports.COMMANDS = COMMANDS = {}));
exports.ACTIONS = {
    TAKE: /take_(\d+)/,
    FREE: /free_(\d+)/,
    DISABLED: /disabled_(\d+)/,
    LEAVE: 'leave',
    TAKE_ONE: 'take',
    FREE_ONE: 'free',
};
//# sourceMappingURL=bot.types.js.map