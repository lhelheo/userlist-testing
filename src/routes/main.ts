import { Router } from "express";
import { createOneClient, deleteOneClient, getAllClients } from "../services/client";
import { addProductToClient, createOneProduct, deleteOneProduct, editOneProduct, getAllProducts } from "../services/product";

export const mainRouter = Router();

mainRouter.get("/", (req, res) => {
    res.json("Hello, world!");
})

mainRouter.post("/client", createOneClient);
mainRouter.get("/client", async (req, res) => {
    const clients = await getAllClients();
    res.json(clients);
});

mainRouter.delete("/client/:id", deleteOneClient);
mainRouter.post("/client/:id/product", addProductToClient);

mainRouter.get("/product", async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
})

mainRouter.post("/product", createOneProduct);
mainRouter.delete("/product/:id", deleteOneProduct);
mainRouter.put("/product/:id", editOneProduct);
