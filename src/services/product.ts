import { prisma } from "../libs/prisma";
import { Request, Response } from "express";

export const addProduct = async (req: Request, res: Response) => {
    const { id } = req.params; 
    try {
        let client = null;
        
        if (id) {
            client = await prisma.client.findUnique({
                where: { id: Number(id) }
            });

            if (!client) {
                return res.status(404).json({ error: "Cliente não encontrado" });
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
        res.status(500).json({ error: "Falha ao criar um produto" });
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
        res.json({ message: "Produto deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Falha ao deletar um produto" });
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
        console.error('Erro ao tentar editar produto:', error);
        if ((error as any).code === 'P2025') {
            return res.status(404).json({ error: "Produto não encontrado" });
        }
        res.status(500).json({ error: "Falha ao editar o produto" });
    }
};

export const processPayment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { paymentValue } = req.body;

    const client = await prisma.client.findUnique({
        where: { id: Number(id) }
    });

    if (!client) {
        return res.status(404).json({ error: "Cliente não encontrado" });
    }

    const products = await prisma.product.findMany({
        where: { clientID: Number(id), status: { not: 'Vendido' } },
        take: 2,
        orderBy: { createAt: 'asc' }
    });
    
    if (products.length === 0) {
        return res.status(404).json({ error: "Nenhum produto encontrado" });
    }

    let reamingPayment = paymentValue;
    for (const product of products) {
        if (reamingPayment <= 0) {
            break;
        }

        const outstandingBalance = product.remaining_balance ?? product.price;

        const paymentForProduct = Math.min(reamingPayment, outstandingBalance);
        reamingPayment = reamingPayment - paymentForProduct;

        const newBalance = outstandingBalance - paymentForProduct;
        await prisma.product.update({
            where: { id: product.id },
            data: {
                remaining_balance: newBalance,
                status: newBalance <= 0 ? 'Vendido' : 'Disponível'
            }
        });
    }

    const updatedProducts = await prisma.product.findMany({
        where: { clientID: Number(id) }
    });

    res.json({
        message: "Pagamento processado com sucesso",
        reamingPayment,
        products: updatedProducts
    })
}

export const payForProduct = async (req: Request, res: Response) => {
    const { clientId, productId } = req.params;
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Pagamento deve ser maior que 0." });
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
            },
        });

        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado para esse cliente." });
        }

        let remainingBalance = product.remaining_balance ?? product.price;

        if (amount > remainingBalance) {
            return res.status(400).json({ 
                error: "Pagamento excede o valor do produto." 
            });
        }

        remainingBalance -= amount;

        const updatedProduct = await prisma.product.update({
            where: { id: Number(productId) },
            data: {
                remaining_balance: remainingBalance,
                status: remainingBalance === 0 ? "Vendido" : "Em processamento",
            },
        });

        res.json({ message: "Pagamento realizado com sucesso.", product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Falha ao realizar pagamento de um produto." });
    }
};