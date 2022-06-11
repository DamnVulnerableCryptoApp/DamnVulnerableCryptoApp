"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLoggingMiddleware = void 0;
var requestLoggingMiddleware = function (req, res, next) {
    if (req.headers['content-type'] === 'application/json')
        console.log('\x1b[31m%s\x1b[0m', "".concat(new Date().toISOString(), "@").concat(req.ip, " ").concat(req.method.toUpperCase(), " ").concat(req.url));
    next();
};
exports.requestLoggingMiddleware = requestLoggingMiddleware;
