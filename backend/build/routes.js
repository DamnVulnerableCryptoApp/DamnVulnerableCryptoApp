"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutes = void 0;
var app_1 = require("./app");
var BlockReorderingController_1 = require("./controllers/aes/BlockReorderingController");
var ByteAtATimeController_1 = require("./controllers/aes/ByteAtATimeController");
var IvDetectionController_1 = require("./controllers/aes/IvDetectionController");
var PaddingOracleController_1 = require("./controllers/aes/PaddingOracleController");
var SubstitutionController_1 = require("./controllers/classic/SubstitutionController");
var HealthController_1 = __importDefault(require("./controllers/HealthController"));
var InsecureRandomController_1 = require("./controllers/InsecureRandomController");
var AlgorithmNegotiationController_1 = require("./controllers/jwt/AlgorithmNegotiationController");
var ChecksumCollisitonsController_1 = require("./controllers/md5/ChecksumCollisitonsController");
var HashLengthExtensionController_1 = require("./controllers/md5/HashLengthExtensionController");
var WeakHashingController_1 = require("./controllers/md5/WeakHashingController");
var KnownPlainTextController_1 = require("./controllers/rc4/KnownPlainTextController");
var KeyDisclosureController_1 = require("./controllers/rsa/KeyDisclosureController");
var TimingAttackController_1 = require("./controllers/TimingAttackController");
var router_1 = require("./router");
var setRoutes = function (app) {
    var _a = (0, router_1.initRouter)(app), get = _a.get, post = _a.post, put = _a.put, patch = _a.patch, del = _a.del;
    get("/health", HealthController_1.default, "index");
    get("/aes/ecb/block-reordering", BlockReorderingController_1.BlockReorderingController, "index");
    get("/aes/ecb/block-reordering/isAdmin", BlockReorderingController_1.BlockReorderingController, "admin");
    post("/aes/ecb/byte-at-a-time/request-access", ByteAtATimeController_1.ByteAtATimeController, "requestAccess");
    post("/aes/ecb/byte-at-a-time/admin", ByteAtATimeController_1.ByteAtATimeController, "admin");
    post("/aes/cbc/iv-detection/send", IvDetectionController_1.IvDetectionController, "send");
    post("/aes/cbc/iv-detection/encrypt", IvDetectionController_1.IvDetectionController, "encrypt");
    post("/aes/cbc/iv-detection/decrypt", IvDetectionController_1.IvDetectionController, "decrypt");
    get("/aes/cbc/padding-oracle", PaddingOracleController_1.PaddingOracleController, "home");
    get("/aes/cbc/padding-oracle/isAdmin", PaddingOracleController_1.PaddingOracleController, "admin");
    get("/classic/substitution", SubstitutionController_1.SubstitutionController, "index");
    get("/classic/substitution/check", SubstitutionController_1.SubstitutionController, "check");
    get("/jwt/negotiation", AlgorithmNegotiationController_1.AlgorithmNegotiationController, "getPastes");
    post("/jwt/negotiation/anonymousAccess", AlgorithmNegotiationController_1.AlgorithmNegotiationController, "requestAccess");
    post("/hash-length-extension", HashLengthExtensionController_1.HashLengthExtensionController, "index");
    post("/hash-length-extension/data", HashLengthExtensionController_1.HashLengthExtensionController, "data");
    post("/md5/login", WeakHashingController_1.WeakHashingController, "login");
    post("/md5/checksum", ChecksumCollisitonsController_1.ChecksumCollisionsController, "checksum", app_1.multerFunc.fields([{ name: "file1" }, { name: "file2" }]));
    post("/rc4/known-plaintext-key-reuse/encrypt", KnownPlainTextController_1.KnownPlainTextController, "encrypt");
    get("/rc4/known-plaintext-key-reuse/history", KnownPlainTextController_1.KnownPlainTextController, "history");
    post("/rsa/key-disclosure/decrypt-mailbox", KeyDisclosureController_1.KeyDisclosureController, "decrypt");
    post("/hash-length-extension", HashLengthExtensionController_1.HashLengthExtensionController, "index");
    post("/hash-length-extension/data", HashLengthExtensionController_1.HashLengthExtensionController, "data");
    get("/random", InsecureRandomController_1.InsecureRandomController, "index");
    get("/random/check", InsecureRandomController_1.InsecureRandomController, "check");
    post("/timing-attack/login", TimingAttackController_1.TimingAttackController, "index");
    post("/timing-attack/forgot-password", TimingAttackController_1.TimingAttackController, "forgotPassword");
};
exports.setRoutes = setRoutes;