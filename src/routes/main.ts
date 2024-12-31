import { Router } from "express";
import { createClient, deleteClientById, getAllClients, getClientById, getProductsByClientId, updateClientById } from "../services/client";
import { addProductToClient, createProduct, deleteProductById, getAllProducts, getProductById, processClientPayment, processProductPaymentByClient, updateProductById } from "../services/product";
import { prisma } from "../libs/prisma";
import { deleteUserByUsername, list, login, register } from "../controllers/user";
import { auth } from "../middlewares/auth";

export const mainRouter = Router();

mainRouter.post("/clients", createClient);
mainRouter.get("/clients", getAllClients);
mainRouter.get("/clients/:id", getClientById);
mainRouter.delete("/clients/:id", deleteClientById);
mainRouter.post("/clients/:id/product", addProductToClient);  // Com cliente 
mainRouter.post("/products", createProduct);             // Sem cliente 
mainRouter.get("/products", getAllProducts);
mainRouter.delete("/products/:id", deleteProductById);
mainRouter.put("/products/:id", updateProductById);
mainRouter.put("/products/:id/client", updateClientById);
mainRouter.get("/products/:id", getProductById);
mainRouter.post("/register", register);
mainRouter.post("/login", login);
mainRouter.delete("/user/:username", auth.private, deleteUserByUsername);
mainRouter.get("/list", auth.private, list); 
mainRouter.patch("/clients/:id/pay", processClientPayment);
mainRouter.get("/clients/:id/products", getProductsByClientId);
mainRouter.patch("/clients/:clientId/products/:productId/pay", processProductPaymentByClient);