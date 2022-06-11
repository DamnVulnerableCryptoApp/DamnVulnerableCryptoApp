"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlagService = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var uuid_1 = require("uuid");
var FlagService = /** @class */ (function () {
    function FlagService() {
    }
    FlagService.createOrLoadFlags = function () {
        var exists = FlagService.flagFileExists();
        if (!exists)
            FlagService.createFlags();
        FlagService.readFlags();
    };
    FlagService.readFlags = function () {
        FlagService.flags = JSON.parse(fs.readFileSync(this.FLAG_FILE).toString());
        return FlagService.flags;
    };
    FlagService.forceCreateFlags = function () {
        this.deleteFlagFile();
        this.createFlags();
    };
    FlagService.deleteFlagFile = function () {
        if (FlagService.flagFileExists())
            fs.unlinkSync(this.FLAG_FILE);
    };
    FlagService.getFlags = function () {
        if (!FlagService.flags)
            FlagService.createOrLoadFlags();
        return FlagService.flags;
    };
    FlagService.listServices = function () {
        return fs.readdirSync(__dirname).map(function (f) { return path.basename(f).replace(".ts", ""); });
    };
    FlagService.generateFlag = function () {
        return (0, uuid_1.v4)();
    };
    FlagService.flagFileExists = function () {
        return fs.existsSync(FlagService.FLAG_FILE);
    };
    FlagService.createFlags = function () {
        var _this = this;
        var flags = {};
        var serviceFiles = FlagService.listServices();
        serviceFiles.forEach(function (f) {
            f = path.basename(f).replace(".ts", "");
            if (f === "FlagService")
                return;
            flags[f] = _this.generateFlag();
        });
        fs.writeFileSync(FlagService.FLAG_FILE, JSON.stringify(flags, null, '\t'));
    };
    FlagService.FLAG_FILE = path.join(__dirname, "../config/flags.json");
    return FlagService;
}());
exports.FlagService = FlagService;
