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