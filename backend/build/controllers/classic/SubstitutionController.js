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
exports.SubstitutionController = void 0;
var SubstitutionService_1 = require("../../services/SubstitutionService");
var BaseController_1 = __importDefault(require("../BaseController"));
var SubstitutionController = /** @class */ (function (_super) {
    __extends(SubstitutionController, _super);
    function SubstitutionController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubstitutionController.prototype.index = function () {
        var enc = SubstitutionService_1.SubstitutionService.encrypt("It was an ambush. Five or our men died. We got the goods. We leave at dawn");
        return { data: enc };
    };
    SubstitutionController.prototype.check = function () {
        var answer = this.req.query["answer"];
        if (answer === "iwbodteld")
            return { flag: SubstitutionService_1.SubstitutionService.getFlag(), success: true };
        else
            return { flag: "", success: false };
    };
    return SubstitutionController;
}(BaseController_1.default));
exports.SubstitutionController = SubstitutionController;
