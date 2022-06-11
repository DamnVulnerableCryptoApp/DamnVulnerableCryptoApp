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
exports.IvDetectionController = void 0;
var IvDetectionService_1 = require("../../services/IvDetectionService");
var BaseController_1 = __importDefault(require("../BaseController"));
var IvDetectionController = /** @class */ (function (_super) {
    __extends(IvDetectionController, _super);
    function IvDetectionController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IvDetectionController.prototype.send = function () {
        var data = this.req.body.data;
        // do nothing... just to have an endpoint for the UI to call :)
        return {};
    };
    IvDetectionController.prototype.encrypt = function () {
        var data = this.req.body.data;
        var f = data === IvDetectionService_1.IvDetectionService.IV ? IvDetectionService_1.IvDetectionService.getFlag() : "";
        return { data: IvDetectionService_1.IvDetectionService.encryptData(data), flag: f };
    };
    IvDetectionController.prototype.decrypt = function () {
        var data = this.req.body.data;
        return { data: IvDetectionService_1.IvDetectionService.decryptData(data), flag: "" };
    };
    return IvDetectionController;
}(BaseController_1.default));
exports.IvDetectionController = IvDetectionController;
