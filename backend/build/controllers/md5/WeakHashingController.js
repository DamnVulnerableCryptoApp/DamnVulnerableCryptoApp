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
exports.WeakHashingController = void 0;
var WeakHashingService_1 = require("../../services/WeakHashingService");
var BaseController_1 = __importDefault(require("../BaseController"));
var WeakHashingController = /** @class */ (function (_super) {
    __extends(WeakHashingController, _super);
    function WeakHashingController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WeakHashingController.prototype.login = function () {
        // https://crackstation.net/ - securepassword = b0439fae31f8cbba6294af86234d5a28
        var body = this.req.body;
        if (body.username === "admin" && WeakHashingService_1.WeakHashingService.hashPassowrd(body.password) === WeakHashingService_1.WeakHashingService.ADMIN_PASSWORD_HASHED)
            return { success: true, flag: WeakHashingService_1.WeakHashingService.getFlag() };
        else
            return { success: false, flag: "" };
    };
    return WeakHashingController;
}(BaseController_1.default));
exports.WeakHashingController = WeakHashingController;
