"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
var express_1 = require("express");
var client_1 = require("../services/client");
var product_1 = require("../services/product");
var prisma_1 = require("../libs/prisma");
var user_1 = require("../controllers/user");
var auth_1 = require("../middlewares/auth");
exports.mainRouter = (0, express_1.Router)();
exports.mainRouter.get("/", function (req, res) {
    res.json("Hello, world!");
});
exports.mainRouter.post("/client", client_1.createClient);
exports.mainRouter.get("/clients", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clients;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, client_1.getAllClients)()];
            case 1:
                clients = _a.sent();
                res.json(clients);
                return [2 /*return*/];
        }
    });
}); });
exports.mainRouter.delete("/client/:id", client_1.deleteClient);
exports.mainRouter.post("/client/:id/product", product_1.addProduct);
exports.mainRouter.get("/products", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, product_1.getAllProducts)()];
            case 1:
                products = _a.sent();
                res.json(products);
                return [2 /*return*/];
        }
    });
}); });
exports.mainRouter.post("/product", product_1.createProduct);
exports.mainRouter.delete("/product/:id", product_1.deleteProduct);
exports.mainRouter.put("/product/:id", product_1.editProduct);
exports.mainRouter.put("/product/:id/client", client_1.editClient);
exports.mainRouter.get("/client/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.client.findUnique({
                    where: { id: Number(req.params.id) },
                    include: { product: true }
                })];
            case 1:
                client = _a.sent();
                res.json(client);
                return [2 /*return*/];
        }
    });
}); });
exports.mainRouter.get("/product/:id", product_1.getOneProduct);
exports.mainRouter.post("/register", user_1.register);
exports.mainRouter.post("/login", user_1.login);
exports.mainRouter.delete("/user/:username", auth_1.auth.private, user_1.deleteUserByUsername);
exports.mainRouter.get("/list", auth_1.auth.private, user_1.list); // This route is protected by the auth middleware
