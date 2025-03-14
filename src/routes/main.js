"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
var express_1 = require("express");
var client_1 = require("../services/client");
var product_1 = require("../services/product");
var user_1 = require("../controllers/user");
var auth_1 = require("../middlewares/auth");
exports.mainRouter = (0, express_1.Router)();
exports.mainRouter.post("/clients", client_1.createClient);
exports.mainRouter.get("/clients", client_1.getAllClients);
exports.mainRouter.get("/clients/:id", client_1.getClientById);
exports.mainRouter.delete("/clients/:id", client_1.deleteClientById);
exports.mainRouter.post("/clients/:id/product", product_1.addProductToClient); // Com cliente 
exports.mainRouter.post("/products", product_1.createProduct); // Sem cliente 
exports.mainRouter.get("/products", product_1.getAllProducts);
exports.mainRouter.delete("/products/:id", product_1.deleteProductById);
exports.mainRouter.put("/products/:id", product_1.updateProductById);
exports.mainRouter.put("/products/:id/client", client_1.updateClientById);
exports.mainRouter.get("/products/:id", product_1.getProductById);
exports.mainRouter.post("/register", user_1.register);
exports.mainRouter.post("/login", user_1.login);
exports.mainRouter.delete("/user/:username", auth_1.auth.private, user_1.deleteUserByUsername);
exports.mainRouter.get("/list", auth_1.auth.private, user_1.list);
exports.mainRouter.patch("/clients/:id/pay", product_1.processClientPayment);
exports.mainRouter.get("/clients/:id/products", client_1.getProductsByClientId);
exports.mainRouter.patch("/clients/:clientId/products/:productId/pay", product_1.processProductPaymentByClient);
