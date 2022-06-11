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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnownPlainTextController = void 0;
var KnownPlainTextService_1 = require("../../services/KnownPlainTextService");
var BaseController_1 = __importDefault(require("../BaseController"));
var KnownPlainTextController = /** @class */ (function (_super) {
    __extends(KnownPlainTextController, _super);
    function KnownPlainTextController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KnownPlainTextController.prototype.encrypt = function () {
        var body = this.req.body;
        var plaintext = body.data;
        console.info("Received content to encrypt: " + plaintext);
        var enc = { encryptedContent: KnownPlainTextService_1.KnownPlainTextService.encrypt(plaintext), date: new Date().toISOString() };
        KnownPlainTextController.encryptedHistory = __spreadArray([enc], KnownPlainTextController.encryptedHistory, true);
        return enc;
    };
    KnownPlainTextController.prototype.history = function () {
        return KnownPlainTextController.encryptedHistory;
    };
    // 78961849-2949-4a7b-ab4a-ea951bd91d32
    KnownPlainTextController.encryptedHistory = [
        { encryptedContent: KnownPlainTextService_1.KnownPlainTextService.encrypt(KnownPlainTextService_1.KnownPlainTextService.getFlag()), date: '2020-04-16T18:30:48.809Z' },
        { encryptedContent: KnownPlainTextService_1.KnownPlainTextService.encrypt("Some random data"), date: '2019-09-20T15:31:45.129Z' }
    ];
    return KnownPlainTextController;
}(BaseController_1.default));
exports.KnownPlainTextController = KnownPlainTextController;
