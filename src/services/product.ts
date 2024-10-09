import { prisma } from "../libs/prisma";

// add product to a auth user
export const addProduct = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const client = await prisma.client.findUnique({
            where: { id: Number(id) }
        });

        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }

        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                price: req.body.price,
                client: {
                    connect: { id: Number(id) }
                }
            }
        });

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to add product" });
    }
}

export const createProduct = async (req: any, res: any) => {
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

// get all products from user auth
export const getAllProducts = async () => {
    const products = await prisma.product.findMany({
        include: { client: true }
    });
    return products;
}

export const deleteProduct = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        await prisma.product.delete({
            where: { id: Number(id) }
        });
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete product" });
    }
}

export const editProduct = async (req: any, res: any) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                name: req.body.name,
                price: req.body.price,
                product_code: req.body.productCode
            }
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to edit product" });
    }
}