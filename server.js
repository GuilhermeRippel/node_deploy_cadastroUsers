import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
prisma.$connect()
    .then(() => console.log("Conexão com o banco de dados estabelecida!"))
    .catch((e) => console.error("Erro ao conectar ao banco de dados:", e));

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Rodando o express na porta ${PORT}`);
});

// Rota para buscar usuários
app.get('/users', async (req, res) => {
    try {
        console.log("Requisição recebida:", req.body);
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
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ message: "Erro ao buscar usuários." });
    }
});

// Rota para criar usuário
app.post('/users', async (req, res) => {
    const {email, name, age} = req.body
    if (!email || !name) {
        return res.status(400).json({ message: "Email e nome são obrigatórios." });
    }
    

    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        console.error("Erro ao criar usuário:", error.message);
        res.status(500).json({ message: "Erro ao criar usuário.", error: error.message });
    }
});


// Rota para atualizar usuário
app.put('/users/:id', async (req, res) => {
    try {
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
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        res.status(500).json({ message: "Erro ao atualizar usuário." });
    }
});

// Rota para deletar usuário
app.delete('/users/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });

        res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        res.status(500).json({ message: "Erro ao deletar usuário." });
    }
});
