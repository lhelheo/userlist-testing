import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";

dotenv.config();

export const auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        let success = false;

        if (req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(" ");
            if (authType === "Bearer"){
                try {
                    JWT.verify(
                        token,
                        process.env.JWT_SECRET as string
                    )
                    success = true;
                } catch (error) {}
            }
        }
        if (success){
            next();
        } else {
            res.status(401).json({ error: "Unauthorized" });
        }
    }
}
