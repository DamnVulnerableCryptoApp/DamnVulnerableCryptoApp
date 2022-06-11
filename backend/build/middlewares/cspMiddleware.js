"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cspMiddleware = void 0;
var cspMiddleware = function (err, req, res, next) {
    console.error(err.stack);
    res.setHeader("Content-Security-Policy", "default-src 'self'");
};
exports.cspMiddleware = cspMiddleware;
