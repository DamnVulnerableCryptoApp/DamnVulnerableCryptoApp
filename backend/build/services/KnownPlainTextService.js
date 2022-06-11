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
exports.KnownPlainTextService = void 0;
var crypto = __importStar(require("crypto"));
var ChallengeService_1 = require("./ChallengeService");
/*
 * RC4 symmetric cipher encryption/decryption
 *
 * @license Public Domain
 * @param string key - secret key for encryption/decryption
 * @param string str - string to be encrypted/decrypted
 * @return string
 */
// @ts-ignore
// @ts-check
function rc4(key, str) {
    var s = [];
    var j = 0, x, res = '';
    for (var i_1 = 0; i_1 < 256; i_1++) {
        s[i_1] = i_1;
    }
    for (var i_2 = 0; i_2 < 256; i_2++) {
        j = (j + s[i_2] + key.charCodeAt(i_2 % key.length)) % 256;
        x = s[i_2];
        s[i_2] = s[j];
        s[j] = x;
    }
    var i = 0;
    j = 0;
    for (var y = 0; y < str.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
}
var KnownPlainTextService = /** @class */ (function (_super) {
    __extends(KnownPlainTextService, _super);
    function KnownPlainTextService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KnownPlainTextService.encrypt = function (data) {
        return Buffer.from(rc4(KnownPlainTextService.KEY.toString(), data)).toString("hex");
    };
    KnownPlainTextService.KEY = crypto.createHash('sha256').update("supersecurekey123").digest().toString();
    return KnownPlainTextService;
}(ChallengeService_1.ChallengeService));
exports.KnownPlainTextService = KnownPlainTextService;
