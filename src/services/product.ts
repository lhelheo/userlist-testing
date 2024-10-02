import { prisma } from "../libs/prisma";

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

export const getAllProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}