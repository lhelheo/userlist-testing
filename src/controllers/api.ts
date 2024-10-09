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
        const existingUser = await prisma.user.findUnique({
            where: { username },
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Criação do novo usuário
        const newUser = await prisma.user.create({
            data: {
                username,
                password, // Armazenando a senha em texto simples (não recomendado)
            },
        });

        // Criação do token JWT
        const token = JWT.sign(
            { id: newUser.id, username: newUser.username },
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        );

        return res.status(201).json({ id: newUser.id, username: newUser.username, token });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: "Failed to register user." });
    }
};

export const login = async (req: any, res: any) => {
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
                return res.status(401).json({ message: "Invalid credentials" }); 
            }
        } else {
            return res.status(404).json({ message: "User not found" }); 
        }
    }
    return res.status(400).json({ status: false, message: "Missing credentials" });  
};


export const list = async (req: any, res: any) => {
    const users = await prisma.user.findMany();
    res.json(users);
}