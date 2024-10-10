import { prisma } from "../libs/prisma";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: any, res: any) => {
    const { username, password } = req.body;

    // Validação básica dos dados
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        // Verifica se o usuário já existe
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (user) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Cria o usuário
        await prisma.user.create({
            data: {
                username,
                password,
            },
        });

        return res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        console.error('Error during register:', error);
        return res.status(500).json({ message: "Failed to create user." });
    }
}

export const login = async (req: any, res: any) => {
    const { username, password } = req.body;

    // Validação básica dos dados
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    try {
        // Verifica se o usuário existe
        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }

        // Verifica se a senha está correta
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password." });
        }

        // Criação do token JWT
        const token = JWT.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ id: user.id, username: user.username, token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: "Failed to login." });
    }
};


export const list = async (req: any, res: any) => {
    const users = await prisma.user.findMany();
    res.json(users);
}