import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";
import { Request, Response } from "express";

// add product to a auth user
export const addProduct = async (req: Request, res: Response) => {
    const { id } = req.params; 
    try {
        let client = null;
        
        if (id) {
            client = await prisma.client.findUnique({
                where: { id: Number(id) }
            });

            if (!client) {
                return res.status(404).json({ error: "Client not found" });
            }
        }

        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                price: req.body.price,
                cost_price: req.body.cost_price,
                product_code: req.body.productCode,
                supplier: req.body.supplier,
                status: req.body.status,
                description: req.body.description,
                ...(client && { client: { connect: { id: Number(id) } } }), 
                user: {
                    connect: { id: req.body.userID || 1 }
                }
            }
        });

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to add product" });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            price: req.body.price,
            ...(req.body.clientId && { client: { connect: { id: req.body.clientId } } })
        }
    });
    return product;
};

// get all products from user auth
export const getAllProducts = async () => {
    const products = await prisma.product.findMany({
        include: { client: true }
    });
    return products;
}

export const getOneProduct = async (req: Request, res: Response) => {
    const product = await prisma.product.findUnique({
        where: { id: Number(req.params.id) },
        include: { client: true }
    });
    res.json(product);
}

export const deleteProduct = async (req: Request, res: Response) => {
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

export const editProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    const {
        name,
        price,
        description,
        product_code,
        cost_price,
        supplier,
        status,
        clientID,
    } = req.body;

    if (!name || price === undefined || !product_code) {
        return res.status(400).json({ error: "Nome, preço e código do produto são obrigatórios." });
    }

    try {
        const product = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                name,
                price: parseFloat(price),
                description: description || null,
                product_code: product_code || null,
                cost_price: cost_price ? parseFloat(cost_price) : undefined,
                supplier: supplier || null,
                status: status || 'Disponível', 
                clientID: clientID || null,
            }
        });

        res.json(product);
    } catch (error) {
        console.error('Error editing product:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return res.status(404).json({ error: "Produto não encontrado." });
            }
        }
        res.status(500).json({ error: "Falha ao editar o produto" });
    }
};

export const processPayment = async (req: Request, res: Response) => {
    const { clientId } = req.params;
    const { productId, paymentAmount } = req.body;

    if (!paymentAmount || paymentAmount <= 0) {
        return res.status(400).json({ error: "Insira um valor de pagamento válido." });
    }

    try {
        const client = await prisma.client.findUnique({
            where: { id: Number(clientId) },
        });
        if (!client) {
            return res.status(404).json({ error: "Cliente não encontrado." });
        }

        const product = await prisma.product.findFirst({
            where: {
                id: Number(productId),
                clientID: Number(clientId),
                status: "Em processamento",
            },
        });
        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado ou já vendido." });
        }

        const remainingBalance = product.remaining_balance ?? product.price;

        let newRemainingBalance = remainingBalance - paymentAmount;

        let newStatus = product.status;
        if (newRemainingBalance <= 0) {
            newRemainingBalance = 0;
            newStatus = "Vendido";
        }

        const updatedProduct = await prisma.product.update({
            where: { id: Number(productId) },
            data: {
                remaining_balance: newRemainingBalance,
                status: newStatus,
            },
        });

        res.json({
            message: "Pagamento processado com sucesso.",
            product: updatedProduct,
        });
    } catch (error) {
        console.error("Erro ao processar pagamento:", error);
        res.status(500).json({ error: "Erro ao processar pagamento." });
    }
};
