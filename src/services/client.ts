import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const createClient = async (data: Prisma.UserCreateInput) => {
    const result = await prisma.user.create({
        data
    })
    return result;
}