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