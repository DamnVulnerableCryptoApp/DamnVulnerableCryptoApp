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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimingAttackService = void 0;
var ChallengeService_1 = require("./ChallengeService");
var TimingAttackService = /** @class */ (function (_super) {
    __extends(TimingAttackService, _super);
    function TimingAttackService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimingAttackService.checkLogin = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // simulate going to the database
                    // the ideia is that the app goes to the db searching for the current user
                    // we added a long time to be more reliable, with less FP's
                    return [4 /*yield*/, this.sleep(100)];
                    case 1:
                        // simulate going to the database
                        // the ideia is that the app goes to the db searching for the current user
                        // we added a long time to be more reliable, with less FP's
                        _a.sent();
                        if (!(username.toLowerCase() === TimingAttackService.USER.username)) return [3 /*break*/, 3];
                        // simulate other actions like checking if the user isn't locked, doesn't need to change pass
                        // update login attempts, and hash the password
                        // we did a sleep to simulate the time those actions would take, and increased it a bit, so it is easier to spot the difference
                        // a real timming attack may have really low time differences, so we just exagerated it to make it easier of noticing
                        // since we already 'simulated' hashing the password anc compared it we don't actually need to change to an actual password
                        // as we don't want to have any valid login, just the possibility of finding an available user
                        return [4 /*yield*/, this.sleep(500)];
                    case 2:
                        // simulate other actions like checking if the user isn't locked, doesn't need to change pass
                        // update login attempts, and hash the password
                        // we did a sleep to simulate the time those actions would take, and increased it a bit, so it is easier to spot the difference
                        // a real timming attack may have really low time differences, so we just exagerated it to make it easier of noticing
                        // since we already 'simulated' hashing the password anc compared it we don't actually need to change to an actual password
                        // as we don't want to have any valid login, just the possibility of finding an available user
                        _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    TimingAttackService.checkUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sleep(5000)]; // just to make sure this method is not bruteforced
                    case 1:
                        _a.sent(); // just to make sure this method is not bruteforced
                        return [2 /*return*/, username === TimingAttackService.USER.username];
                }
            });
        });
    };
    TimingAttackService.sleep = function (miliseconds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () { return resolve(true); }, miliseconds);
                    })];
            });
        });
    };
    // https://github.com/danielmiessler/SecLists/blob/master/Usernames/cirt-default-usernames.txt
    // password -> aslidhaiusdas7da8shdiukjas123
    TimingAttackService.USER = { username: "abel", password: "___" };
    return TimingAttackService;
}(ChallengeService_1.ChallengeService));
exports.TimingAttackService = TimingAttackService;
