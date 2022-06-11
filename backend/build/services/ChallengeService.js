"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChallengeService = void 0;
var FlagService_1 = require("./FlagService");
var ChallengeService = /** @class */ (function () {
    function ChallengeService() {
    }
    ChallengeService.getFlag = function () {
        return FlagService_1.FlagService.getFlags()[this.name];
    };
    return ChallengeService;
}());
exports.ChallengeService = ChallengeService;
