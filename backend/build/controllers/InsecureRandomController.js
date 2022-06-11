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
exports.InsecureRandomController = void 0;
var InsecureRandomService_1 = require("../services/InsecureRandomService");
var BaseController_1 = __importDefault(require("./BaseController"));
var InsecureRandomController = /** @class */ (function (_super) {
    __extends(InsecureRandomController, _super);
    function InsecureRandomController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // IMPORTANT:
    // this challenge may have problems if being served to more then one person...
    // since the nextcoupons will be overriden
    InsecureRandomController.prototype.index = function () {
        InsecureRandomController.currentCoupons = InsecureRandomService_1.InsecureRandomService.generate5RandomValues(5);
        InsecureRandomController.nextCoupons = InsecureRandomService_1.InsecureRandomService.generate5RandomValues(5);
        console.info("Generated 5 coupons: " + InsecureRandomController.currentCoupons.toString() + " - and 5 to be predicted: " + InsecureRandomController.nextCoupons.toString());
        return { coupons: InsecureRandomController.currentCoupons };
    };
    InsecureRandomController.prototype.check = function () {
        var code = parseFloat(this.getQueryParam("couponCode"));
        if (InsecureRandomController.currentCoupons.includes(code))
            return { valid: true, flag: "" };
        else if (InsecureRandomController.nextCoupons.includes(code))
            return { valid: true, flag: InsecureRandomService_1.InsecureRandomService.getFlag() };
        else
            return { flag: "", valid: false };
    };
    return InsecureRandomController;
}(BaseController_1.default));
exports.InsecureRandomController = InsecureRandomController;
