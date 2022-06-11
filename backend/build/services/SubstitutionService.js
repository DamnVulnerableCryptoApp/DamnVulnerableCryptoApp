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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubstitutionService = void 0;
var ChallengeService_1 = require("./ChallengeService");
var SubstitutionService = /** @class */ (function (_super) {
    __extends(SubstitutionService, _super);
    function SubstitutionService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubstitutionService.decrypt = function (content) {
        // reverse the map and use encryption and we can decrypt :)
        var decryptionMap = {};
        Object.keys(SubstitutionService.SUBSTITUTIONS).forEach(function (k) {
            var v = SubstitutionService.SUBSTITUTIONS[k];
            decryptionMap[v] = k;
        });
        return SubstitutionService.encrypt(content, decryptionMap);
    };
    SubstitutionService.encrypt = function (content, map) {
        if (map === void 0) { map = SubstitutionService.SUBSTITUTIONS; }
        content = content.toLowerCase();
        var newContent = "";
        for (var i = 0; i < content.length; i++) {
            var c = content.charAt(i);
            var d = map[c];
            if (!d)
                d = c; // if we do not find a corresponding letter, leave the original
            newContent += d;
        }
        return newContent;
    };
    SubstitutionService.SUBSTITUTIONS = {
        "a": "z",
        "b": "y",
        "c": "x",
        "d": "q",
        "e": "p",
        "f": "o",
        "g": "n",
        "h": "m",
        "i": "l",
        "j": "k",
        "k": "j",
        "l": "i",
        "m": "h",
        "n": "g",
        "o": "f",
        "p": "e",
        "q": "w",
        "r": "v",
        "s": "u",
        "t": "t",
        "u": "s",
        "v": "r",
        "w": "d",
        "x": "c",
        "y": "b",
        "z": "a"
    };
    return SubstitutionService;
}(ChallengeService_1.ChallengeService));
exports.SubstitutionService = SubstitutionService;
