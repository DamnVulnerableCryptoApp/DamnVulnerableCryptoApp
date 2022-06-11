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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockReorderingService = void 0;
var node_buffer_1 = require("node:buffer");
var node_crypto_1 = __importDefault(require("node:crypto"));
var ChallengeService_1 = require("./ChallengeService");
var BlockReorderingService = /** @class */ (function (_super) {
    __extends(BlockReorderingService, _super);
    function BlockReorderingService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // TODO: DO NOT LET BYTE AT A TIME HERE
    BlockReorderingService.createToken = function (username, isAdmin) {
        if (isAdmin === void 0) { isAdmin = false; }
        var tokenContent = "username=".concat(username, ";isAdmin=").concat(isAdmin, ";at=").concat(new Date().toUTCString());
        var encrypted = this.encryptToken(tokenContent);
        console.info("Generated token: " + tokenContent);
        console.info("Encrypted anonymous token " + encrypted);
        return encrypted;
    };
    BlockReorderingService.encryptToken = function (token) {
        var cipher = node_crypto_1.default.createCipheriv('aes-128-ecb', node_buffer_1.Buffer.from(BlockReorderingService.KEY), '');
        var tokenBuffer = node_buffer_1.Buffer.from(token, 'utf8');
        var encrypted = cipher.update(tokenBuffer);
        encrypted = node_buffer_1.Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString("hex");
    };
    BlockReorderingService.decryptToken = function (token) {
        var decipher = node_crypto_1.default.createDecipheriv('aes-128-ecb', node_buffer_1.Buffer.from(BlockReorderingService.KEY), '');
        var encryptedText = node_buffer_1.Buffer.from(token, 'hex');
        var decrypted = decipher.update(encryptedText);
        decrypted = node_buffer_1.Buffer.concat([decrypted, decipher.final()]);
        var t = decrypted.toString();
        console.info("Decrypted token: " + t);
        return t;
    };
    BlockReorderingService.isAdmin = function (token) {
        console.info("Decrypting token " + token);
        var tokenObj = {};
        var decryptedToken = this.decryptToken(token);
        var tokenPars = decryptedToken.split(";");
        tokenPars.forEach(function (p) {
            var tmp = p.split("=");
            var key = tmp[0];
            var value = tmp[1];
            tokenObj[key] = value;
        });
        return tokenObj.isAdmin === 'true';
    };
    BlockReorderingService.KEY = "aneuck27sSi2m3b$";
    return BlockReorderingService;
}(ChallengeService_1.ChallengeService));
exports.BlockReorderingService = BlockReorderingService;
