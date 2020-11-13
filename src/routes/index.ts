import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const router = express.Router()

// Default
router.get('/', (req, res) => {
  res.send('Hello World!')
})

// ** USERS **
// Get all users
router.get('/user', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

// Get a single user
router.get('/user/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.findOne({ where: { id: Number(id) } })
  res.json(user)
})

// ** POSTS **
// Get all posts
router.get('/post', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  })
  res.json(posts)
})

// Get a single post
router.get('/post/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.findOne({
    where: { id: Number(id) },
    include: { author: true },
  })
  res.json(post)
})

// ** PROJECTS **
// Get all projects
router.get('/project', async (req, res) => {
  const projects = await prisma.project.findMany({
    include: {
      user: true,
    },
  })
  res.json(projects)
})

// Get a single project
router.get('/project/:id', async (req, res) => {
  const { id } = req.params
  const project = await prisma.project.findOne({
    where: { id: Number(id) },
    include: { user: true },
  })
  res.json(project)
})

// Get all projects for user
router.get('/project/user/:id', async (req, res) => {
  const { id } = req.params
  const projects = await prisma.project.findMany({
    where: {
      userId: Number(id),
    },
  })
  res.json(projects)
})

// Add a project
router.post('/project', async (req, res) => {
  const { title, description, userId } = req.body
  const result = await prisma.project.create({
    data: {
      title,
      description,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })
  res.json(result)
})

// ** PROFILE **
// Get a user profile by ID
router.get('/profile/:id', async (req, res) => {
  const { id } = req.params
  const profile = await prisma.profile.findOne({
    where: { userId: Number(id) },
    include: {
      user: true,
    },
  })
  res.json(profile)
})

// 404
router.get('*', (req, res) => {
  res.redirect('/')
})

export default router
