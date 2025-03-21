import { prisma } from "../libs/prisma";
import JWT from "jsonwebtoken";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
    if (req.body.username && req.body.password) {
        let { username, password } = req.body;
        
        let hasUser = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (!hasUser) {
            let newUser = await prisma.user.create({
                data: {
                    username,
                    password,
                },
            });
            
            const token = JWT.sign(
                { id: newUser.id, username: newUser.username },
                process.env.JWT_SECRET as string,
                { expiresIn: "1h" }
            )
            return res.status(201).json({ id: newUser.id, username: newUser.username, token });
        } else {
            return res.status(400).json({ message: "Usuário já existe" });
        }
    }
    return res.status(400).json({ message: "Credenciais inválidas" });
}

export const login = async (req: Request, res: Response) => {
    if (req.body.username && req.body.password) {
        let { username, password } = req.body;

        let user = await prisma.user.findUnique({
            where: {
                username,
            },
        });

        if (user) {
            if (user.password === password) {
                const token = JWT.sign(
                    { id: user.id, username: user.username },
                    process.env.JWT_SECRET as string,
                    { expiresIn: "1h" }
                );
                return res.status(200).json({ status: true, token });
            } else {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }
        } else {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
    }
    return res.status(400).json({ status: false, message: "Dados inválidos" });
};

export const list = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
}

export const deleteUserByUsername = async (req: Request, res: Response) => {
    const { username } = req.params;
    const user = await prisma.user.delete({
        where: {
            username,
        },
    });
    res.json(user);
}