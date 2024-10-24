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
exports.editProduct = exports.deleteProduct = exports.getOneProduct = exports.getAllProducts = exports.createProduct = exports.addProduct = void 0;
var client_1 = require("@prisma/client");
var prisma_1 = require("../libs/prisma");
// add product to a auth user
var addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, client, product, error_1;
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
                return [4 /*yield*/, prisma_1.prisma.product.create({
                        data: {
                            name: req.body.name,
                            price: req.body.price,
                            cost_price: req.body.cost_price,
                            product_code: req.body.productCode,
                            supplier: req.body.supplier,
                            status: req.body.status,
                            description: req.body.description,
                            client: {
                                connect: { id: Number(id) }
                            },
                            user: {
                                connect: { id: req.body.userID || 1 }
                            }
                        }
                    })];
            case 3:
                product = _a.sent();
                res.json(product);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                res.status(500).json({ error: "Failed to add product" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addProduct = addProduct;
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.product.create({
                    data: {
                        name: req.body.name,
                        price: req.body.price,
                        client: {
                            connect: { id: req.body.clientId }
                        }
                    }
                })];
            case 1:
                product = _a.sent();
                return [2 /*return*/, product];
        }
    });
}); };
exports.createProduct = createProduct;
// get all products from user auth
var getAllProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.product.findMany({
                    include: { client: true }
                })];
            case 1:
                products = _a.sent();
                return [2 /*return*/, products];
        }
    });
}); };
exports.getAllProducts = getAllProducts;
var getOneProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.product.findUnique({
                    where: { id: Number(req.params.id) },
                    include: { client: true }
                })];
            case 1:
                product = _a.sent();
                res.json(product);
                return [2 /*return*/];
        }
    });
}); };
exports.getOneProduct = getOneProduct;
var deleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1.prisma.product.delete({
                        where: { id: Number(id) }
                    })];
            case 2:
                _a.sent();
                res.json({ message: "Product deleted successfully" });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).json({ error: "Failed to delete product" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteProduct = deleteProduct;
var editProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, price, description, product_code, cost_price, supplier, status, product, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, price = _a.price, description = _a.description, product_code = _a.product_code, cost_price = _a.cost_price, supplier = _a.supplier, status = _a.status;
                if (!name || price === undefined || !product_code) {
                    return [2 /*return*/, res.status(400).json({ error: "Nome, preço e código do produto são obrigatórios." })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1.prisma.product.update({
                        where: { id: Number(id) },
                        data: {
                            name: name,
                            price: parseFloat(price),
                            description: description || null,
                            product_code: product_code || null,
                            cost_price: cost_price ? parseFloat(cost_price) : undefined,
                            supplier: supplier || null,
                            status: status || 'Disponível',
                        }
                    })];
            case 2:
                product = _b.sent();
                res.json(product);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                console.error('Error editing product:', error_3);
                if (error_3 instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (error_3.code === 'P2025') {
                        return [2 /*return*/, res.status(404).json({ error: "Produto não encontrado." })];
                    }
                }
                res.status(500).json({ error: "Falha ao editar o produto" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.editProduct = editProduct;
