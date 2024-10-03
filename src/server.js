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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
require("dotenv/config");
var cors_1 = __importDefault(require("cors"));
var main_1 = require("./routes/main");
var helmet_1 = __importDefault(require("helmet"));
var server = (0, express_1.default)();
server.use((0, helmet_1.default)());
server.use((0, cors_1.default)());
server.use((0, express_1.urlencoded)({ extended: true }));
server.disable('x-powered-by');
server.use(express_1.default.json());
server.use(main_1.mainRouter);
var port = process.env.PORT || 3000;
server.listen(port, function () {
    console.log("\uD83D\uDE80 Servidor rodando em http://localhost:".concat(port));
});
