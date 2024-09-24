import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Rodando o express na porta ${PORT}`);
});

app.get('/users', async (req, res) => {
    let users = [];

    if (req.query) {
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age,
            },
        });
    } else {
        users = await prisma.user.findMany();
    }

    res.status(200).json(users);
});

app.post('/users', async (req, res) => {
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        },
    });

    res.status(201).json(user);
});

app.put('/users/:id', async (req, res) => {
    const user = await prisma.user.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        },
    });

    res.status(200).json(user);
});

app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });

    res.status(200).json({ message: "Usuário deletado com sucesso!" });
});
