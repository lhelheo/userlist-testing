import { prisma } from "../libs/prisma";

export const register = async (req: any, res: any) => {
    const { username, password } = req.body;
    const user = await prisma.user.create({
        data: {
            username,
            password,
        },
    });
    res.json(user);
}

export const login = async (req: any, res: any) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }
    if (user.password === password) {
        res.json({ message: "Login successful!" });
    } else {
        res.json({ message: "Login failed!" });
    }
}

export const list = async (req: any, res: any) => {
    const users = await prisma.user.findMany();
    res.json(users);
}