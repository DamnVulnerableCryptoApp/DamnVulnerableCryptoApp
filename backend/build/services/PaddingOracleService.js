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
exports.PaddingOracleService = void 0;
var crypto = __importStar(require("crypto"));
var ChallengeService_1 = require("./ChallengeService");
var PaddingOracleService = /** @class */ (function (_super) {
    __extends(PaddingOracleService, _super);
    function PaddingOracleService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaddingOracleService.getAnonymousToken = function () {
        var tokenContent = PaddingOracleService.createTokenString();
        var encrypted = this.encryptToken(tokenContent);
        console.info("Encrypted anonymous token " + encrypted);
        return encrypted;
    };
    PaddingOracleService.createTokenString = function (user, isAdmin) {
        if (user === void 0) { user = "Anonymous"; }
        if (isAdmin === void 0) { isAdmin = false; }
        return "lastRequestAt=".concat(new Date().toISOString(), ";isAdmin=").concat(isAdmin, ";username=").concat(user);
    };
    PaddingOracleService.encryptToken = function (token) {
        var cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(PaddingOracleService.KEY), PaddingOracleService.IV);
        var tokenBuffer = Buffer.from(token, 'utf8');
        var encrypted = cipher.update(tokenBuffer);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString("hex");
    };
    PaddingOracleService.decryptToken = function (token) {
        var decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(PaddingOracleService.KEY), PaddingOracleService.IV);
        var encryptedText = Buffer.from(token, 'hex');
        var decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        var t = decrypted.toString();
        console.info("Decrypted token: " + t);
        return t;
    };
    PaddingOracleService.parseTokenString = function (token) {
        var tokenObj = {};
        var decryptedToken = this.decryptToken(token);
        var tokenPars = decryptedToken.split(";");
        tokenPars.forEach(function (p) {
            var tmp = p.split("=");
            var key = tmp[0];
            var value = tmp[1];
            tokenObj[key] = value;
        });
        return tokenObj;
    };
    PaddingOracleService.isAdmin = function (token) {
        console.info("Decrypting token " + token);
        var t = this.parseTokenString(token);
        return t.isAdmin === 'true';
    };
    PaddingOracleService.KEY = "SUP3RS3CUR3K3Y123456789012345678";
    PaddingOracleService.IV = "super_secure_iv1";
    return PaddingOracleService;
}(ChallengeService_1.ChallengeService));
exports.PaddingOracleService = PaddingOracleService;
