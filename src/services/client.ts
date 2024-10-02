import { prisma } from "../libs/prisma";

export const getAllClients = async () => {
    const clients = await prisma.client.findMany({
        include: {
            product: true
        }
    });
    return clients;
}

export const deleteOneClient = async (req: any, res: any) => {
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

export const createOneClient = async (req: any, res: any) => {
    if (!req.body.name || !req.body.email || !req.body.phone) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    
    try {
        const existingClient = await prisma.client.findFirst({
            where: { name: req.body.name }
        });

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

