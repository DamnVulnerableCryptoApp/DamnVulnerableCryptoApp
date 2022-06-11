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
exports.IvDetectionService = void 0;
var crypto = __importStar(require("crypto"));
var ChallengeService_1 = require("./ChallengeService");
var IvDetectionService = /** @class */ (function (_super) {
    __extends(IvDetectionService, _super);
    function IvDetectionService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IvDetectionService.encryptData = function (data) {
        var cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(IvDetectionService.KEY), IvDetectionService.IV);
        var buff = Buffer.from(data, 'utf8');
        var encrypted = cipher.update(buff);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString("hex");
    };
    IvDetectionService.decryptData = function (data) {
        var cipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(IvDetectionService.KEY), IvDetectionService.IV);
        cipher.setAutoPadding(false);
        var buff = Buffer.from(data, 'hex');
        var decrypted = cipher.update(buff);
        decrypted = Buffer.concat([decrypted, cipher.final()]);
        return decrypted.toString();
    };
    IvDetectionService.KEY = "123321123321asdx";
    IvDetectionService.IV = "super_secure_iv2";
    return IvDetectionService;
}(ChallengeService_1.ChallengeService));
exports.IvDetectionService = IvDetectionService;
