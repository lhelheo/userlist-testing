import { Router } from "express";
import { prisma } from "../libs/prisma";
import { createClient, getAllClients, getAllProducts } from "../services/client";

export const mainRouter = Router();

// Test
mainRouter.get("/", (req, res) => {
    res.json("Hello, world!");
})

// Post one client
mainRouter.post("/client", createClient);

// Get all clients - showing all products
mainRouter.get("/client", async (req, res) => {
    const clients = await getAllClients();
    res.json(clients);
});

// Delete client by id
mainRouter.delete("/client/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const client = await prisma.client.findUnique({
            where: { id: Number(id) }
        });

        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }

        await prisma.client.delete({
            where: { id: Number(id) }
        });

        res.json({ message: "Client deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete client" });
    }
});

// Add product to one client
mainRouter.post("/client/:id/product", async (req, res) => {
    const { id } = req.params;
    const user = await prisma.client.findUnique({
        where: {
            id: Number(id)
        }
    });

    if (!user) {
        return res.status(404).json({ error: "Client not found" });
    }

    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            price: req.body.price,
            client: {
                connect: { id: user.id }
            }
        }
    })

    res.json(product);
})

// Get all Products
mainRouter.get("/product", async (req, res) => {
    const products = await getAllProducts();
    res.json(products);
})

// create a product
mainRouter.post("/product", async (req, res) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            price: req.body.price,
            client: {
                connect: { id: req.body.clientId }
            }
        }
    })
    res.json(product);
})