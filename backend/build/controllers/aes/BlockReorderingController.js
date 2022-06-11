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
exports.BlockReorderingController = void 0;
var BlockReorderingService_1 = require("../../services/BlockReorderingService");
var BaseController_1 = __importDefault(require("../BaseController"));
var BlockReorderingController = /** @class */ (function (_super) {
    __extends(BlockReorderingController, _super);
    function BlockReorderingController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlockReorderingController.prototype.index = function () {
        var token = BlockReorderingService_1.BlockReorderingService.createToken(this.getHeader("username"));
        return { token: token };
    };
    BlockReorderingController.prototype.admin = function () {
        var token = this.getHeader("token");
        var isAdmin = false;
        try {
            isAdmin = BlockReorderingService_1.BlockReorderingService.isAdmin(token);
        }
        catch (ex) {
            throw new Error(ex);
        }
        if (isAdmin)
            return { isAdmin: isAdmin, flag: BlockReorderingService_1.BlockReorderingService.getFlag() };
        else
            return { isAdmin: isAdmin, flag: "" };
    };
    return BlockReorderingController;
}(BaseController_1.default));
exports.BlockReorderingController = BlockReorderingController;
