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
exports.KeyDisclosureService = void 0;
var crypto = __importStar(require("crypto"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var ChallengeService_1 = require("./ChallengeService");
var KeyDisclosureService = /** @class */ (function (_super) {
    __extends(KeyDisclosureService, _super);
    function KeyDisclosureService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeyDisclosureService.encrypt = function (content) {
        var publicKey = this.readPublicKey();
        var buffer = Buffer.from(content);
        return crypto.publicEncrypt(publicKey, buffer).toString("hex");
    };
    KeyDisclosureService.decrypt = function (content, key) {
        var buffer = Buffer.from(content, "hex");
        return crypto.privateDecrypt(key, buffer).toString();
    };
    KeyDisclosureService.readPrivateKey = function () {
        return fs.readFileSync(KeyDisclosureService.PRIVATE_KEY_PATH, "utf8");
    };
    KeyDisclosureService.readPublicKey = function () {
        return fs.readFileSync(KeyDisclosureService.PUBLIC_KEY_PATH, "utf8");
    };
    KeyDisclosureService.PRIVATE_KEY_PATH = path.join(__dirname, "../config/privatekey.pem");
    KeyDisclosureService.PUBLIC_KEY_PATH = path.join(__dirname, "../config/publickey.pem");
    return KeyDisclosureService;
}(ChallengeService_1.ChallengeService));
exports.KeyDisclosureService = KeyDisclosureService;
