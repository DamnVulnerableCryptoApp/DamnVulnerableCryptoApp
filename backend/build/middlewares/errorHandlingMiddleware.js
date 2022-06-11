"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlingMiddleware = void 0;
var errorHandlingMiddleware = function (err, req, res, next) {
    console.debug(err.stack);
    res.status(500).send('Something broke!');
};
exports.errorHandlingMiddleware = errorHandlingMiddleware;
