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
exports.AlgorithmNegotiationController = void 0;
var AlgorithmNegotiationService_1 = require("../../services/AlgorithmNegotiationService");
var BaseController_1 = __importDefault(require("../BaseController"));
var AlgorithmNegotiationController = /** @class */ (function (_super) {
    __extends(AlgorithmNegotiationController, _super);
    function AlgorithmNegotiationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlgorithmNegotiationController.prototype.getPastes = function () {
        var jwt = this.getHeader("Authorization");
        var pastes = AlgorithmNegotiationController.PUBLIC_PASTES;
        if (!jwt)
            return pastes;
        try {
            var parsedJwt = AlgorithmNegotiationService_1.AlgorithmNegotiationService.parseToken(jwt);
            var isAdmin = parsedJwt.payload.isAdmin;
            if (isAdmin)
                pastes = pastes.concat(AlgorithmNegotiationController.ADMIN_PASTE);
            return pastes;
        }
        catch (ex) {
            console.error(ex);
            return pastes;
        }
    };
    AlgorithmNegotiationController.prototype.requestAccess = function () {
        var jwt = AlgorithmNegotiationService_1.AlgorithmNegotiationService.generateJWT("ANONYMOUSUSER");
        return { token: AlgorithmNegotiationService_1.AlgorithmNegotiationService.JWTToString(jwt) };
    };
    AlgorithmNegotiationController.PUBLIC_PASTES = [
        { public: true, author: "FakeG0s7", content: 'Irure dolore deserunt in aliqua ex sunt qui proident sit ut incididunt culpa anim eiusmod ea eiusmod eiusmod enim excepteur aute quis pariatur consequat ad ea ad non aute aute consequat culpa est qui ullamco fugiat est culpa.' },
        { public: true, author: "Anon7!92", content: 'Aute sint culpa irure laboris id ea in qui dolor laboris commodo ullamco ullamco in sunt velit cupidatat consectetur sunt dolor ad fugiat ut cillum tempor proident.' }
    ];
    AlgorithmNegotiationController.ADMIN_PASTE = { public: false, author: "Admin", content: AlgorithmNegotiationService_1.AlgorithmNegotiationService.getFlag() };
    return AlgorithmNegotiationController;
}(BaseController_1.default));
exports.AlgorithmNegotiationController = AlgorithmNegotiationController;
