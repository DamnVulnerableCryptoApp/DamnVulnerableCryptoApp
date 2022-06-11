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
exports.AlgorithmNegotiationService = void 0;
var crypto = __importStar(require("crypto"));
var ChallengeService_1 = require("./ChallengeService");
var AlgorithmNegotiationService = /** @class */ (function (_super) {
    __extends(AlgorithmNegotiationService, _super);
    function AlgorithmNegotiationService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlgorithmNegotiationService.generateJWT = function (username, admin, timestamp) {
        if (admin === void 0) { admin = false; }
        if (timestamp === void 0) { timestamp = -1; }
        if (timestamp === -1) {
            var oneYearFromNow = new Date();
            timestamp = oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        }
        var jwt = {
            header: { alg: "HS256", typ: "JWT" },
            payload: {
                sub: username,
                isAdmin: admin,
                iat: Math.round(timestamp / 1000)
            },
            signature: ""
        };
        jwt.signature = this.signJwt(jwt, AlgorithmNegotiationService.JWT_SIGNING_KEY);
        return jwt;
    };
    // https://medium.com/101-writeups/hacking-json-web-token-jwt-233fe6c862e6
    AlgorithmNegotiationService.parseToken = function (jwt) {
        var parts = jwt.split(".");
        parts = parts.map(function (p, i) {
            return i === 2 ? p : JSON.parse(AlgorithmNegotiationService.fromBase64Url(p));
        });
        var parsedJWT = { header: parts[0], payload: parts[1], signature: parts[2] };
        switch (parsedJWT.header.alg.toString().toLowerCase()) {
            case 'hs256':
                if (AlgorithmNegotiationService.signJwt(parsedJWT, AlgorithmNegotiationService.JWT_SIGNING_KEY) !== parsedJWT.signature)
                    throw new Error("Invalid Signature");
                break;
            case 'none':
                break;
            default: throw new Error("JWT PARSING: ".concat(parts[0].alg, " algorithm not supported yet"));
        }
        return parsedJWT;
    };
    AlgorithmNegotiationService.JWTToString = function (jwt) {
        var header = AlgorithmNegotiationService.toBase64URL(JSON.stringify(jwt.header));
        var payload = AlgorithmNegotiationService.toBase64URL(JSON.stringify(jwt.payload));
        // const signature = AlgorithmNegociationController.toBase64URL(JSON.stringify(jwt.signature));
        // jwt.signature is already in base64
        return "".concat(header, ".").concat(payload, ".").concat(jwt.signature);
    };
    AlgorithmNegotiationService.signJwt = function (jwt, signingKey) {
        var header = AlgorithmNegotiationService.toBase64URL(JSON.stringify(jwt.header));
        var payload = AlgorithmNegotiationService.toBase64URL(JSON.stringify(jwt.payload));
        var toSign = "".concat(header, ".").concat(payload);
        var signedBase64 = crypto.createHmac('sha256', signingKey).update(toSign).digest("base64");
        var signedbase64Url = AlgorithmNegotiationService.base64ToBase64Url(signedBase64);
        return signedbase64Url;
    };
    AlgorithmNegotiationService.base64ToBase64Url = function (content) {
        return content.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    };
    AlgorithmNegotiationService.toBase64URL = function (content) {
        content = this.toBase64(content);
        return this.base64ToBase64Url(content);
    };
    AlgorithmNegotiationService.fromBase64Url = function (content) {
        content = content.replace(/-/g, "+").replace(/_/g, "/");
        var r = content.length % 4;
        content += "=".repeat((4 - r) % 4);
        content = this.fromBase64(content);
        return content;
    };
    AlgorithmNegotiationService.toBase64 = function (content) {
        return Buffer.from(content).toString('base64');
    };
    AlgorithmNegotiationService.fromBase64 = function (content) {
        return Buffer.from(content, 'base64').toString();
    };
    AlgorithmNegotiationService.JWT_SIGNING_KEY = "kd8ehais9)i3n!na";
    return AlgorithmNegotiationService;
}(ChallengeService_1.ChallengeService));
exports.AlgorithmNegotiationService = AlgorithmNegotiationService;
