import { Router } from 'express';
import { createUser, createUsers, deleteUser, getAllUsers, getUserByEmail, updateUser } from '../services/user';
import { createClient } from '../services/client';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.get("/test", (req, res) => {
    res.json({ testado: true });
});

mainRouter.post("/user", async (req, res) => {
    const user = await createUser({
        name: "teste2",
        email: "teste2@gmail.com",
        posts: {
            create: {
                title: "Post do Teste2",
                body: "Corpo de teste"
            }
        }
    })
    if (user) {
        res.status(201).json({ user });
    }
    else {
        res.status(500).json({ error: "Error email already exists" });
    }
})

mainRouter.post("/users", async (req, res) => {
    const result = await createUsers([]);
    res.json({ result });
})

mainRouter.get("/users", async (req, res) => {
    const result = await getAllUsers();
    res.json({ result });
})

mainRouter.get("/user", async (req, res) => {
    const result = await getUserByEmail("leonardo@gmail.com");
    res.json({ result });
})

mainRouter.put("/user", async (req, res) => {
    const result = await updateUser();
    res.json({ result });
})

mainRouter.delete("/user", async (req, res) => {
    const result = await deleteUser();
    res.json({ result });
})

mainRouter.post("/client", async (req, res) => {
    const client = await createClient({
        name: "client",
        email: "leonardo@gmail.com",
        posts: {
            create: {
                title: "Post do client",
                body: "Corpo de client"
            }
        }
    })
    if (client) {
        res.status(201).json({ client });
    }
    else {
        res.status(500).json({ error: "Error email already exists" });
    }
})
