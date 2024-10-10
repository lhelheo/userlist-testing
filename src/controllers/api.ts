import { prisma } from "../libs/prisma";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: any, res: any) => {
    if (req.body.username && req.body.password) {
        let { username, password } = req.body;

        let hasUser = await prisma.user.findUnique({
            where: {
                username: username
            }
        });
        if(!hasUser) {
            let newUser = await prisma.user.create({
                data: {
                    username: username,
                    password: password
                }
            });

            const token = JWT.sign({ id: newUser.id, username: newUser.username }, 
                process.env.JWT_SECRET as string, { expiresIn: '2h' });
            
            res.status(201).json({ id: newUser.id, token });
        } else {
            res.json({ error: "User already exists" });
        }
    }
    res.json({ error: "Invalid data" });
}

export const login = async (req: any, res: any) => {
    if (req.body.username && req.body.password) {
        let username: string = req.body.username;
        let password: string = req.body.password;

        let user = await prisma.user.findUnique({
            where: { username, password }
        });

        if (user) {
            const token = JWT.sign({ id: user.id, username: user.username }, 
            process.env.JWT_SECRET as string, { expiresIn: '2h' });
            res.json({ status: true, token });
            return;
        }
    }
    res.json({ status: false, error: "Invalid login" });
}

export const list = async (req: any, res: any) => {
    const users = await prisma.user.findMany();
    res.json(users);
}