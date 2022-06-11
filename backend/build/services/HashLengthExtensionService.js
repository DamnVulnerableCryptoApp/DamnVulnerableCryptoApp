"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashLengthExtensionService = void 0;
var crypto = __importStar(require("crypto"));
var ChallengeService_1 = require("./ChallengeService");
var HashLengthExtensionService = /** @class */ (function (_super) {
    __extends(HashLengthExtensionService, _super);
    function HashLengthExtensionService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HashLengthExtensionService.sign = function (data) {
        // latin1 is needed for this to work. UTF8 generates different hash
        return crypto.createHash('sha256').update(HashLengthExtensionService.KEY + data, "latin1").digest("hex");
    };
    HashLengthExtensionService.DATA = "56476870637942706379427164584E30494746756233526F5A5849675A57467A644756794947566E5A793467534746325A534235623355675A6D3931626D51676447686C625342686247772F";
    HashLengthExtensionService.KEY = "a".repeat(43);
    HashLengthExtensionService.EXPECTED_SIGNATURE = "6a8267d997efd3eb87ffa2812de8ad97b66221f39139880d178f7639977bf569";
    return HashLengthExtensionService;
}(ChallengeService_1.ChallengeService));
exports.HashLengthExtensionService = HashLengthExtensionService;
