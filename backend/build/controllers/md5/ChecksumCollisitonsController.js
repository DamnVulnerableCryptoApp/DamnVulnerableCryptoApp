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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecksumCollisionsController = void 0;
var ChecksumCollisionService_1 = require("../../services/ChecksumCollisionService");
var BaseController_1 = __importDefault(require("../BaseController"));
// to exploit this there are a few tools, and script to automate them.
// I like to use https://github.com/thereal1024/python-md5-collision. its a small and automated python script on top of fastcol
// to make it work smoothly you need to:
// sudo apt-get install libboost-all-dev
// python3 gen_coll_c.py
// this will compile the c template in the project folder and create two different files.
var ChecksumCollisionsController = /** @class */ (function (_super) {
    __extends(ChecksumCollisionsController, _super);
    function ChecksumCollisionsController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChecksumCollisionsController.prototype.checksum = function () {
        return __awaiter(this, void 0, void 0, function () {
            var files, file1, file2, success, flag, md51, md52, sha11, sha12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = this.req.files;
                        file1 = files["file1"][0];
                        file2 = files["file2"][0];
                        success = false;
                        flag = "";
                        return [4 /*yield*/, (ChecksumCollisionService_1.ChecksumCollisionService.getMd5FileChecksum(file1.buffer))];
                    case 1:
                        md51 = _a.sent();
                        return [4 /*yield*/, (ChecksumCollisionService_1.ChecksumCollisionService.getMd5FileChecksum(file2.buffer))];
                    case 2:
                        md52 = _a.sent();
                        if (!(md51 === md52)) return [3 /*break*/, 5];
                        return [4 /*yield*/, (ChecksumCollisionService_1.ChecksumCollisionService.getSha1FileChecksum(file1.buffer))];
                    case 3:
                        sha11 = _a.sent();
                        return [4 /*yield*/, (ChecksumCollisionService_1.ChecksumCollisionService.getSha1FileChecksum(file2.buffer))];
                    case 4:
                        sha12 = _a.sent();
                        if (sha11 !== sha12) {
                            success = true;
                            flag = ChecksumCollisionService_1.ChecksumCollisionService.getFlag();
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/, { flag: flag, success: success }];
                }
            });
        });
    };
    return ChecksumCollisionsController;
}(BaseController_1.default));
exports.ChecksumCollisionsController = ChecksumCollisionsController;
