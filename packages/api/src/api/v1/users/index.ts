import express, { Request, Response } from 'express'
import { getUsers, createUser, login, getUser, editUser, deleteUser } from './users'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const usersData = await getUsers()

  if (usersData) {
    res.json(usersData)
  }
})

router.post('/create', async (req: Request, res: Response) => {
  const userData = await createUser(req.body)

  if (userData) {
    res.json(userData)
  }
})

router.post('/validate', async (req: Request, res: Response) => {
  const userData = await getUser(req.body.at)

  if (userData) {
    res.json(userData)
  }
})

router.post('/login', async (req: Request, res: Response) => {
  const loginData = await login(req.body)

  if (loginData) {
    res.json(loginData)
  }
})

router.put('/:id', async (req: Request, res: Response) => {
  const userData = await editUser(req.params.id, req.body)

  if (userData) {
    res.json(userData)
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  const userData = await deleteUser(req.params.id)

  if (userData) {
    res.json(userData)
  }
})

export default router
