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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyDisclosureController = void 0;
var KeyDisclosureService_1 = require("../../services/KeyDisclosureService");
var BaseController_1 = __importDefault(require("../BaseController"));
var KeyDisclosureController = /** @class */ (function (_super) {
    __extends(KeyDisclosureController, _super);
    function KeyDisclosureController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeyDisclosureController.prototype.decrypt = function () {
        var body = this.req.body;
        var key = body.privateKey;
        var decryptionSuccess = false;
        try {
            if (KeyDisclosureService_1.KeyDisclosureService.decrypt(KeyDisclosureController.MAILBOX_CHECK, key) === KeyDisclosureController.MAILBOX_CHECK_STRING)
                decryptionSuccess = true;
        }
        catch (ex) { }
        if (decryptionSuccess)
            return { emails: KeyDisclosureController.EMAILS, success: true, flag: KeyDisclosureService_1.KeyDisclosureService.getFlag() };
        else
            return { emails: [], success: false, flag: "" };
    };
    // this is used to validate if the decryption was successfull.
    // assuming each mailbox has a string (MAILBOX_CHECK) that needs to be decrypted and checked with the original content (MAILBOX_CHECK_STRING)
    // if they match, decryption was successfull
    KeyDisclosureController.MAILBOX_CHECK_STRING = "pleasefindme";
    KeyDisclosureController.MAILBOX_CHECK = KeyDisclosureService_1.KeyDisclosureService.encrypt(KeyDisclosureController.MAILBOX_CHECK_STRING);
    KeyDisclosureController.EMAILS = [{
            body: "Hi mate,\n As you requested: ".concat(KeyDisclosureService_1.KeyDisclosureService.getFlag()),
            date: new Date().toISOString(),
            from: "Fake Reporter <fake.reporter@fakecryptomail.com>",
            subject: "Got a flag for you",
            to: "Fake expert <fake.expert@fakecryptomail.com>"
        },
        {
            body: "Hey fake,\n Have you heard about DamnVulnerableCryptoApp? Seems really cool, take a look at it :)",
            date: new Date().toISOString(),
            from: "Gh0st1337 <gh0st.1337@fakecryptomail.com>",
            subject: "Nice Tool",
            to: "Fake expert <fake.expert@fakecryptomail.com>"
        }
    ];
    return KeyDisclosureController;
}(BaseController_1.default));
exports.KeyDisclosureController = KeyDisclosureController;
