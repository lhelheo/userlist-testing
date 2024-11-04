import { Router } from "express";
import { createClient, deleteClient, editClient, getAllClients } from "../services/client";
import { addProduct, createProduct, deleteProduct, editProduct, getAllProducts, getOneProduct } from "../services/product";
import { prisma } from "../libs/prisma";
import { deleteUserByUsername, list, login, register } from "../controllers/user";
import { auth } from "../middlewares/auth";

export const mainRouter = Router();

mainRouter.get("/", (req, res) => {
    res.json("Hello, world!");
})
mainRouter.post("/client", createClient);
mainRouter.get("/clients", async (req, res) => {
    const clients = await getAllClients();
    res.json(clients);
});
mainRouter.delete("/client/:id", deleteClient);
mainRouter.post("/client/:id/product", addProduct);  // Com cliente associado
mainRouter.post("/product", addProduct);             // Sem cliente associado
mainRouter.get("/products", async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
})
mainRouter.post("/product", createProduct);
mainRouter.delete("/product/:id", deleteProduct);
mainRouter.put("/product/:id", editProduct);
mainRouter.put("/product/:id/client", editClient);
mainRouter.get("/client/:id", async (req, res) => {
    const client = await prisma.client.findUnique({
        where: { id: Number(req.params.id) },
        include: { product: true }
    });
    res.json(client);
});
mainRouter.get("/product/:id", getOneProduct);
mainRouter.post("/register", register);
mainRouter.post("/login", login);
mainRouter.delete("/user/:username", auth.private, deleteUserByUsername);
mainRouter.get("/list", auth.private, list); // This route is protected by the auth middleware