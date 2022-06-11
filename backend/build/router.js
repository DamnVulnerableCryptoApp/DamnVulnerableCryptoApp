"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printRoutes = exports.initRouter = exports.routes = void 0;
exports.routes = [];
var initRouter = function (app) {
    var route = function (method, path) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return __awaiter(void 0, void 0, void 0, function () {
            var controller, action;
            return __generator(this, function (_a) {
                controller = args.shift();
                action = args.shift();
                exports.routes.push({ method: method, path: path, controller: controller.name, action: action });
                app[method].apply(app, __spreadArray(__spreadArray([path], args, false), [function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                        var instance, success, r, ex_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 4, , 5]);
                                    instance = Object.create(controller.prototype);
                                    instance.constructor.apply(instance, [req, res, action]);
                                    return [4 /*yield*/, instance.beforeAction()];
                                case 1:
                                    success = _a.sent();
                                    r = undefined;
                                    if (!success) return [3 /*break*/, 3];
                                    return [4 /*yield*/, instance[action]()
                                        // fallback in case the action method doesn't return a reply. Use the return value of the method and send it in the response
                                    ]; // call the actual endpoint method
                                case 2:
                                    r = _a.sent(); // call the actual endpoint method
                                    _a.label = 3;
                                case 3:
                                    // fallback in case the action method doesn't return a reply. Use the return value of the method and send it in the response
                                    if (!res.headersSent)
                                        res.send(r);
                                    return [3 /*break*/, 5];
                                case 4:
                                    ex_1 = _a.sent();
                                    // this should only be done with the vuln app :)
                                    res.status(500).send(ex_1);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); }], false));
                return [2 /*return*/];
            });
        });
    };
    var get = function (path) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return route.apply(void 0, __spreadArray(["get", path], args, false));
    };
    var post = function (path) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return route.apply(void 0, __spreadArray(["post", path], args, false));
    };
    var patch = function (path) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return route.apply(void 0, __spreadArray(["patch", path], args, false));
    };
    var put = function (path) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return route.apply(void 0, __spreadArray(["put", path], args, false));
    };
    var del = function (path) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return route.apply(void 0, __spreadArray(["delete", path], args, false));
    };
    var options = function (path) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return route.apply(void 0, __spreadArray(["options", path], args, false));
    };
    var head = function (path) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return route.apply(void 0, __spreadArray(["head", path], args, false));
    };
    var trace = function (path) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return route.apply(void 0, __spreadArray(["trace", path], args, false));
    };
    var all = function (path) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return route.apply(void 0, __spreadArray(["all", path], args, false));
    };
    var render = function (path) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return route.apply(void 0, __spreadArray(["render", path], args, false));
    };
    return { get: get, post: post, patch: patch, put: put, del: del, options: options, head: head, trace: trace, all: all, render: render };
};
exports.initRouter = initRouter;
// TODO: replace this by a routine that prints all routes defined in express
var printRoutes = function () {
    console.table(exports.routes);
};
exports.printRoutes = printRoutes;
