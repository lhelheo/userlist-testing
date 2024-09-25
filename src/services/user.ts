import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";

export const createUser = async (data: Prisma.UserCreateInput) => {
    const result = await prisma.user.upsert({
        where: {
            email: data.email
        },
        update: {},
        create: data
    })
    return result;
}

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    try{
        return await prisma.user.createMany({
            data: users,
            skipDuplicates: true
        })
    } catch (error) {
        return false;
    }
}

export const getAllUsers = async () => {
    let currentPage = 1;
    let perPage = 2;

    const users = await prisma.user.findMany({
        skip: (currentPage - 1) * perPage,
        take: perPage,
        orderBy: {
            name: "asc"
        },
        where: {
            // posts: {
            //     some: {
            //         title: {
            //             startsWith: ""
            //         }
            //     }  
            // },
            OR: [
                {
                    email: {
                        endsWith: "@gmail.com"
                    }
                },
                {
                    email: {
                        endsWith: "@hotmail.com"
                    }
                }
            ]
        },
        select: {
            id: true,
            name: true,
            email: true,
            posts: {
                select: {
                    title: true,
                    id: true
                }
            },
            _count: {
                select: {
                    posts: true
                }
            }
        }
    });
    return users;
}

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            name: true,
        }
    })
    return user;
}

export const updateUser = async () => {
    const updatedUser = await prisma.user.updateMany({
        where: {
            email: {
                endsWith: "@gmail.com"
            },
        },
        data: {
            status: false
        }
    })
    return updatedUser;
}

export const deleteUser = async () => {
    const deletedUser = await prisma.user.delete({
        where: {
            email: "leonardo@gmail.com"
        }
    })
    return deletedUser;
}