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
exports.HashLengthExtensionController = void 0;
var HashLengthExtensionService_1 = require("../../services/HashLengthExtensionService");
var BaseController_1 = __importDefault(require("../BaseController"));
var HashLengthExtensionController = /** @class */ (function (_super) {
    __extends(HashLengthExtensionController, _super);
    function HashLengthExtensionController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HashLengthExtensionController.prototype.index = function () {
        var data = this.req.body.data;
        // json doesn't allow hex escape. Content needs to be escaped in unicode... ex: \x00 -> \u0000
        var tampered = false;
        // data = "56476870637942706379427164584E30494746756233526F5A5849675A57467A644756794947566E5A793467534746325A534235623355675A6D3931626D51676447686C625342686247772F\x80\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x06\x18asd"
        // signature = "1346d98335868e2da281eda2b48dd6954b91566f19f7a84bf24e22867f1a60a2"
        console.log(HashLengthExtensionService_1.HashLengthExtensionService.sign(data.data));
        if (HashLengthExtensionService_1.HashLengthExtensionService.sign(data.data) === data.signature) {
            if (HashLengthExtensionService_1.HashLengthExtensionService.EXPECTED_SIGNATURE !== data.signature)
                return { flag: HashLengthExtensionService_1.HashLengthExtensionService.getFlag(), tampered: false };
        }
        else
            tampered = true;
        return { flag: "", tampered: tampered };
    };
    HashLengthExtensionController.prototype.data = function () {
        var data = HashLengthExtensionService_1.HashLengthExtensionService.DATA;
        var signature = HashLengthExtensionService_1.HashLengthExtensionService.sign(data);
        return { data: data, signature: signature };
    };
    return HashLengthExtensionController;
}(BaseController_1.default));
exports.HashLengthExtensionController = HashLengthExtensionController;
