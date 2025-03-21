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
exports.getProductsByClientId = exports.updateClientById = exports.createClient = exports.deleteClientById = exports.getClientById = exports.getAllClients = void 0;
var prisma_1 = require("../libs/prisma");
var getAllClients = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var clients, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma_1.prisma.client.findMany({
                        include: { product: true }
                    })];
            case 1:
                clients = _a.sent();
                if (req && res) {
                    res.json(clients);
                }
                else {
                    return [2 /*return*/, clients];
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Erro ao tentar buscar clientes:', error_1);
                return [2 /*return*/, []];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllClients = getAllClients;
var getClientById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var client, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma_1.prisma.client.findUnique({
                        where: { id: Number(req.params.id) },
                        include: { product: true }
                    })];
            case 1:
                client = _a.sent();
                if (req && res) {
                    res.json(client);
                }
                else {
                    return [2 /*return*/, client];
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Erro ao tentar buscar cliente:', error_2);
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getClientById = getClientById;
var deleteClientById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, client, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, prisma_1.prisma.client.findUnique({
                        where: { id: Number(id) },
                        include: { product: true }
                    })];
            case 2:
                client = _a.sent();
                if (!client) {
                    return [2 /*return*/, res.status(404).json({ error: "Client not found" })];
                }
                if (!(client.product.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, prisma_1.prisma.product.deleteMany({
                        where: { clientID: Number(id) }
                    })];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, prisma_1.prisma.client.delete({
                    where: { id: Number(id) }
                })];
            case 5:
                _a.sent();
                res.json({ message: "Client and associated products deleted successfully" });
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                res.status(500).json({ error: "Failed to delete client or associated products" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.deleteClientById = deleteClientById;
var createClient = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var existingClient, user, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.name || !req.body.phone) {
                    return [2 /*return*/, res.status(400).json({ error: "Missing required fields" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                return [4 /*yield*/, prisma_1.prisma.client.findFirst({
                        where: { name: req.body.name }
                    })];
            case 2:
                existingClient = _a.sent();
                if (existingClient) {
                    return [2 /*return*/, res.status(400).json({ error: "Cliente já criado já existe" })];
                }
                return [4 /*yield*/, prisma_1.prisma.client.create({
                        data: {
                            name: req.body.name,
                            email: req.body.email,
                            phone: req.body.phone,
                        }
                    })];
            case 3:
                user = _a.sent();
                if (!(req.body.productName && req.body.productPrice && req.body.productCode)) return [3 /*break*/, 5];
                return [4 /*yield*/, prisma_1.prisma.product.create({
                        data: {
                            name: req.body.productName,
                            price: req.body.productPrice,
                            product_code: req.body.productCode,
                            clientID: user.id
                        }
                    })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                res.json({ user: user });
                return [3 /*break*/, 7];
            case 6:
                error_4 = _a.sent();
                res.status(500).json({ error: "Failed to create client or product" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.createClient = createClient;
var updateClientById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, client, updatedClient, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_1.prisma.client.findUnique({
                        where: { id: Number(id) }
                    })];
            case 2:
                client = _a.sent();
                if (!client) {
                    return [2 /*return*/, res.status(404).json({ error: "Client not found" })];
                }
                return [4 /*yield*/, prisma_1.prisma.client.update({
                        where: { id: Number(id) },
                        data: {
                            name: req.body.name,
                            email: req.body.email,
                            phone: req.body.phone
                        }
                    })];
            case 3:
                updatedClient = _a.sent();
                res.json(updatedClient);
                return [3 /*break*/, 5];
            case 4:
                error_5 = _a.sent();
                res.status(500).json({ error: "Failed to update client" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateClientById = updateClientById;
var getProductsByClientId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, client, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1.prisma.client.findUnique({
                        where: { id: Number(id) },
                        include: { product: true }
                    })];
            case 2:
                client = _a.sent();
                if (!client) {
                    return [2 /*return*/, res.status(404).json({ error: "Client not found" })];
                }
                res.json(client.product);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                res.status(500).json({ error: "Failed to fetch products for client" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getProductsByClientId = getProductsByClientId;
