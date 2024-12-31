import { prisma } from "../libs/prisma";
import { Request, Response } from "express";

export const getAllClients = async (req: Request, res: Response) => {
    try {
        const clients = await prisma.client.findMany({
            include: { product: true }
        })

        if (req && res) {
            res.json(clients);
        }
        else {
            return clients;
        }
    }
    catch (error) {
        console.error('Erro ao tentar buscar clientes:', error);
        return [];
    }
}

export const getClientById = async (req: Request, res: Response) => {
    try {
        const client = await prisma.client.findUnique({
            where: { id: Number(req.params.id) },
            include: { product: true }
        })

        if (req && res) {
            res.json(client);
        }
        else {
            return client;
        }
    }
    catch (error) {
        console.error('Erro ao tentar buscar cliente:', error);
        return null;
    }
}
    
export const deleteClientById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const client = await prisma.client.findUnique({
            where: { id: Number(id) },
            include: { product: true }
        });

        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }

        if (client.product.length > 0) {
            await prisma.product.deleteMany({
                where: { clientID: Number(id) }
            });
        }

        await prisma.client.delete({
            where: { id: Number(id) }
        });

        res.json({ message: "Client and associated products deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete client or associated products" });
    }
}

export const createClient = async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.phone) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    
    try {
        const existingClient = await prisma.client.findFirst({
            where: { name: req.body.name }
        });

        if (existingClient) {
            return res.status(400).json({ error: "Cliente já criado já existe" });
        }

        const user = await prisma.client.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            }
        });

        if (req.body.productName && req.body.productPrice && req.body.productCode) {
            await prisma.product.create({
                data: {
                    name: req.body.productName,
                    price: req.body.productPrice,
                    product_code: req.body.productCode,
                    clientID: user.id
                }
            });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: "Failed to create client or product" });
    }
};

export const updateClientById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const client = await prisma.client.findUnique({
            where: { id: Number(id) }
        });

        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }

        const updatedClient = await prisma.client.update({
            where: { id: Number(id) },
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            }
        });

        res.json(updatedClient);
    } catch (error) {
        res.status(500).json({ error: "Failed to update client" });
    }
}

export const getProductsByClientId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const client = await prisma.client.findUnique({
            where: { id: Number(id) },
            include: { product: true }
        });

        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }

        res.json(client.product);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products for client" });
    }
}