"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.processProductPaymentByClient = exports.processClientPayment = exports.updateProductById = exports.deleteProductById = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.addProductToClient = void 0;
var prisma_1 = require("../libs/prisma");
var addProductToClient = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, client, product, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                client = null;
                if (!id) return [3 /*break*/, 3];
                return [4 /*yield*/, prisma_1.prisma.client.findUnique({
                        where: { id: Number(id) }
                    })];
            case 2:
                client = _a.sent();
                if (!client) {
                    return [2 /*return*/, res.status(404).json({ error: "Cliente não encontrado" })];
                }
                _a.label = 3;
            case 3: return [4 /*yield*/, prisma_1.prisma.product.create({
                    data: __assign(__assign({ name: req.body.name, price: req.body.price, cost_price: req.body.cost_price, product_code: req.body.productCode, supplier: req.body.supplier, status: req.body.status, description: req.body.description }, (client && { client: { connect: { id: Number(id) } } })), { user: {
                            connect: { id: req.body.userID || 1 }
                        } })
                })];
            case 4:
                product = _a.sent();
                res.json(product);
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                res.status(500).json({ error: "Falha ao criar um produto" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.addProductToClient = addProductToClient;
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma_1.prisma.product.create({
                    data: __assign({ name: req.body.name, price: req.body.price }, (req.body.clientId && { client: { connect: { id: req.body.clientId } } }))
                })];
            case 1:
                product = _a.sent();
                return [2 /*return*/, product];
        }
    });
}); };
exports.createProduct = createProduct;
var getAllProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, prisma_1.prisma.product.findMany({
                        include: { client: true }
                    })];
            case 1:
                products = _a.sent();
                if (req && res) {
                    res.json(products);
                }
                else {
                    return [2 /*return*/, products];
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Erro ao tentar buscar produtos:', error_2);
                return [2 /*return*/, []];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllProducts = getAllProducts;
var getProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
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
exports.getProductById = getProductById;
var deleteProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_3;
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
                res.json({ message: "Produto deletado com sucesso" });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500).json({ error: "Falha ao deletar um produto" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteProductById = deleteProductById;
var updateProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, price, description, product_code, cost_price, supplier, status, clientID, product, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, name = _a.name, price = _a.price, description = _a.description, product_code = _a.product_code, cost_price = _a.cost_price, supplier = _a.supplier, status = _a.status, clientID = _a.clientID;
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
                            clientID: clientID || null,
                        }
                    })];
            case 2:
                product = _b.sent();
                res.json(product);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                console.error('Erro ao tentar editar produto:', error_4);
                if (error_4.code === 'P2025') {
                    return [2 /*return*/, res.status(404).json({ error: "Produto não encontrado" })];
                }
                res.status(500).json({ error: "Falha ao editar o produto" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateProductById = updateProductById;
var processClientPayment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, paymentValue, client, products, reamingPayment, _i, products_1, product, outstandingBalance, paymentForProduct, newBalance, updatedProducts;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                paymentValue = req.body.paymentValue;
                return [4 /*yield*/, prisma_1.prisma.client.findUnique({
                        where: { id: Number(id) }
                    })];
            case 1:
                client = _b.sent();
                if (!client) {
                    return [2 /*return*/, res.status(404).json({ error: "Cliente não encontrado" })];
                }
                return [4 /*yield*/, prisma_1.prisma.product.findMany({
                        where: { clientID: Number(id), status: { not: 'Vendido' } },
                        take: 2,
                        orderBy: { createAt: 'asc' }
                    })];
            case 2:
                products = _b.sent();
                if (products.length === 0) {
                    return [2 /*return*/, res.status(404).json({ error: "Nenhum produto encontrado" })];
                }
                reamingPayment = paymentValue;
                _i = 0, products_1 = products;
                _b.label = 3;
            case 3:
                if (!(_i < products_1.length)) return [3 /*break*/, 6];
                product = products_1[_i];
                if (reamingPayment <= 0) {
                    return [3 /*break*/, 6];
                }
                outstandingBalance = (_a = product.remaining_balance) !== null && _a !== void 0 ? _a : product.price;
                paymentForProduct = Math.min(reamingPayment, outstandingBalance);
                reamingPayment = reamingPayment - paymentForProduct;
                newBalance = outstandingBalance - paymentForProduct;
                return [4 /*yield*/, prisma_1.prisma.product.update({
                        where: { id: product.id },
                        data: {
                            remaining_balance: newBalance,
                            status: newBalance <= 0 ? 'Vendido' : 'Disponível'
                        }
                    })];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6: return [4 /*yield*/, prisma_1.prisma.product.findMany({
                    where: { clientID: Number(id) }
                })];
            case 7:
                updatedProducts = _b.sent();
                res.json({
                    message: "Pagamento processado com sucesso",
                    reamingPayment: reamingPayment,
                    products: updatedProducts
                });
                return [2 /*return*/];
        }
    });
}); };
exports.processClientPayment = processClientPayment;
var processProductPaymentByClient = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, clientId, productId, amount, client, product, remainingBalance, updatedProduct, error_5;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.params, clientId = _a.clientId, productId = _a.productId;
                amount = req.body.amount;
                if (!amount || amount <= 0) {
                    return [2 /*return*/, res.status(400).json({ error: "Pagamento deve ser maior que 0." })];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, prisma_1.prisma.client.findUnique({
                        where: { id: Number(clientId) },
                    })];
            case 2:
                client = _c.sent();
                if (!client) {
                    return [2 /*return*/, res.status(404).json({ error: "Cliente não encontrado." })];
                }
                return [4 /*yield*/, prisma_1.prisma.product.findFirst({
                        where: {
                            id: Number(productId),
                            clientID: Number(clientId),
                        },
                    })];
            case 3:
                product = _c.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ error: "Produto não encontrado para esse cliente." })];
                }
                remainingBalance = (_b = product.remaining_balance) !== null && _b !== void 0 ? _b : product.price;
                if (amount > remainingBalance) {
                    return [2 /*return*/, res.status(400).json({
                            error: "Pagamento excede o valor do produto."
                        })];
                }
                remainingBalance -= amount;
                return [4 /*yield*/, prisma_1.prisma.product.update({
                        where: { id: Number(productId) },
                        data: {
                            remaining_balance: remainingBalance,
                            status: remainingBalance === 0 ? "Vendido" : "Em processamento",
                        },
                    })];
            case 4:
                updatedProduct = _c.sent();
                res.json({ message: "Pagamento realizado com sucesso.", product: updatedProduct });
                return [3 /*break*/, 6];
            case 5:
                error_5 = _c.sent();
                console.error(error_5);
                res.status(500).json({ error: "Falha ao realizar pagamento de um produto." });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.processProductPaymentByClient = processProductPaymentByClient;
