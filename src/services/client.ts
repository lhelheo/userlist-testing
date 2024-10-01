import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

// export const createClient = async (data: Prisma.UserCreateInput) => {
//     try {
//         const result = await prisma.user.create({ data });
//     } catch (error) {
//         return false;
//     }
// }

// export const createClients = async (clients: Prisma.UserCreateInput[]) => {
//     try {
//         return await prisma.user.createMany({
//             data: clients,
//             skipDuplicates: true
//         });
//     } catch (error) {
//         return false;
//     }
// }

// export const updateClient = async (id: number, data: Prisma.UserUpdateInput) => {
//     try {
//         const updatedClient = await prisma.user.update({
//             where: { id },
//             data
//         });
//         return updatedClient;
//     } catch (error) {
//         return false;
//     }
// }

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

export const createClient = async (req, res) => {
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