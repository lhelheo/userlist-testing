import { Router } from "express";
import { prisma } from "../libs/prisma";

export const mainRouter = Router();

mainRouter.get("/", (req, res) => {
    res.json("Hello, world!");
})

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

mainRouter.get("/client", async (req, res) => {
    const users = await prisma.client.findMany();
    res.json(users);
})

mainRouter.delete("/client/:id", async (req, res) => {
    const { id } = req.params;
    const user = await prisma.client.delete({
        where: {
            id: Number(id)
        }
    })

    res.json(user);
})

// mainRouter.put("/client", async (req, res) => {
//     const result = await updateClient(Number(req.body.id), {
//         name: req.body.name,
//         email: req.body.email
//     })
//     res.json({result});
// })

// get all products
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