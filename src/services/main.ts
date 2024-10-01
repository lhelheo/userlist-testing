import { prisma } from "../libs/prisma";

export const getAllClients = async () => {
    const clients = await prisma.client.findMany({
        include: {
            product: true
        }
    });
    return clients;
}

export const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
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

export const addProductToClient = async (req: any, res: any) => {
    const { id } = req.params;

    try {
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
                product_code: req.body.productCode,
                client: {
                    connect: { id: user.id }
                }
            }
        });

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to add product to client" });
    }
};

export const deleteOneClient = async (req: any, res: any) => {
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
}

export const createOneProduct = async (req: any, res: any) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            price: req.body.price,
            client: {
                connect: { id: req.body.clientId }
            }
        }
    })
    return product;
}