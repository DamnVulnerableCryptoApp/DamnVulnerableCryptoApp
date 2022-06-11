"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.frontendPort = exports.port = exports.app = exports.multerFunc = void 0;
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var cspMiddleware_1 = require("./middlewares/cspMiddleware");
var errorHandlingMiddleware_1 = require("./middlewares/errorHandlingMiddleware");
var requestLoggingMiddleware_1 = require("./middlewares/requestLoggingMiddleware");
var router_1 = require("./router");
var routes_1 = require("./routes");
exports.multerFunc = (0, multer_1.default)({ limits: { fileSize: 1000 * 1000 * 5 } }); // 5mb
exports.app = (0, express_1.default)();
exports.port = parseInt(process.env.PORT || "4000");
exports.frontendPort = parseInt(process.env.FRONTEND_PORT || "3000");
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(requestLoggingMiddleware_1.requestLoggingMiddleware);
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)({ origin: "http://localhost:".concat(exports.frontendPort) }));
exports.app.use("/docs", express_1.default.static(path_1.default.join(__dirname, 'docs')));
(0, routes_1.setRoutes)(exports.app);
(0, router_1.printRoutes)();
exports.app.use(cspMiddleware_1.cspMiddleware);
exports.app.use(requestLoggingMiddleware_1.requestLoggingMiddleware);
exports.app.use(errorHandlingMiddleware_1.errorHandlingMiddleware);
if (process.env.NODE_ENV !== "development") {
    exports.app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    exports.app.use("*", function (req, res) { return res.sendFile(__dirname + "/public/index.html"); });
}
var startServer = function () {
    exports.app.listen(exports.port, function () { return console.log("Starting server on port " + exports.port); });
    return exports.app;
};
exports.startServer = startServer;
