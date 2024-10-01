import { Router } from "express";
import { prisma } from "../libs/prisma";

export const mainRouter = Router();

mainRouter.get("/", (req, res) => {
    res.json("Hello, world!");
})

// Post one client
mainRouter.post("/client", async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.phone) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const existingClient = await prisma.client.findFirst({
            where: { name: req.body.name }
        })
        if (existingClient) {
            return res.status(400).json({ error: "Client already exists" });
        }
        const user = await prisma.client.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            }
        });
        if (req.body.productName && req.body.productPrice) {
            await prisma.product.create({
                data: {
                    name: req.body.productName,
                    price: req.body.productPrice,
                    clientID: user.id
                }
            });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: "Failed to create client or product" });
    }
});

// Get all clients - showing all products
mainRouter.get("/client", async (req, res) => {
    const clients = await prisma.client.findMany({
        include: {
            product: true
        }
    });
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

// mainRouter.put("/client", async (req, res) => {
//     const result = await updateClient(Number(req.body.id), {
//         name: req.body.name,
//         email: req.body.email
//     })
//     res.json({result});
// })

// Get all Products
mainRouter.get("/product", async (req, res) => {
    const products = await prisma.product.findMany();
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