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
exports.ByteAtATimeController = void 0;
var ByteAtATimeService_1 = require("../../services/ByteAtATimeService");
var BaseController_1 = __importDefault(require("../BaseController"));
var ByteAtATimeController = /** @class */ (function (_super) {
    __extends(ByteAtATimeController, _super);
    function ByteAtATimeController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ByteAtATimeController.prototype.requestAccess = function () {
        var username = this.getHeader("username");
        var token = ByteAtATimeService_1.ByteAtATimeService.encrypt(username + ByteAtATimeController.ADMIN_PASSWORD);
        return { granted: true, token: token };
    };
    ByteAtATimeController.prototype.admin = function () {
        var auth = this.getHeader("Authorization");
        var b64auth = (auth || '').split(' ')[1] || '';
        var _a = Buffer.from(b64auth, 'base64').toString().split(':'), user = _a[0], password = _a[1];
        var flag = "", success = false;
        if (user === "admin" && password === ByteAtATimeController.ADMIN_PASSWORD) {
            flag = ByteAtATimeService_1.ByteAtATimeService.getFlag();
            success = true;
        }
        return { flag: flag, success: success };
    };
    ByteAtATimeController.ADMIN_PASSWORD = "THISISTHEADMINPASSWORD!!!";
    return ByteAtATimeController;
}(BaseController_1.default));
exports.ByteAtATimeController = ByteAtATimeController;
