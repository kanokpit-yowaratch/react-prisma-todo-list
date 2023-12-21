import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());


app.post(`/create`, async (req, res) => {
    const { title } = req.body
    const result = await prisma.toDoList.create({
        data: {
            title,
            authorId: 1,
        },
    })
    res.json(result)
})

app.post(`/done`, async (req, res) => {
    const { id, status } = req.body
    const result = await prisma.toDoList.update({
        where: {
            id: id
        },
        data: {
            status: status
        }
    });
    res.json(result)
})

app.get('/list', async (req, res) => {
    const posts = await prisma.toDoList.findMany()
    res.json(posts)
})

app.post(`/update`, async (req, res) => {
    const { id, title } = req.body
    const result = await prisma.toDoList.update({
        where: {
            id: Number(id)
        },
        data: {
            title: title
        }
    });
    res.json(result)
})

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params
    const post = await prisma.toDoList.delete({
        where: { id: Number(id) },
    })
    res.json(post)
})

app.get('/in-progress', async (req, res) => {
    const posts = await prisma.toDoList.findMany({
        where: { status: true },
        include: { author: true }
    })
    res.json(posts)
})

app.get('/filter-task', async (req, res) => {
    const { searchString }: { searchString?: string } = req.query;
    const filteredPosts = await prisma.toDoList.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: searchString,
                    },
                },
            ],
        },
    })
    res.json(filteredPosts)
})

app.get('/done', async (req, res) => {
    const posts = await prisma.toDoList.findMany({
        where: { status: false },
        include: { author: true }
    })
    res.json(posts)
})

app.post(`/user`, async (req, res) => {
    const result = await prisma.user.create({
        data: {
            ...req.body,
        },
    })
    res.json(result)
})

const server = app.listen(4000, () =>
    console.log(
        '🚀 Server ready at: http://localhost:4000',
    ),
)