import { Router } from "express";
import { createClient, deleteClient, editClient, getAllClients } from "../services/client";
import { addProduct, createProduct, deleteProduct, editProduct, getAllProducts } from "../services/product";
import { prisma } from "../libs/prisma";
import { list, login, register } from "../controllers/apiController";

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
mainRouter.post("/client/:id/product", addProduct);
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
mainRouter.post("/register", register);
mainRouter.post("/login", login);
mainRouter.get("/list", list);