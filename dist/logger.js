"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const morgan_1 = __importDefault(require("morgan"));
morgan_1.default.token("localDate", function getDate(req) {
    return new Date().toLocaleString();
});
morgan_1.default.format("stream", ":remote-addr :remote-user [:localDate] :method :url :status :res[content-length]");
exports.logger = morgan_1.default("combined");
//# sourceMappingURL=logger.js.map