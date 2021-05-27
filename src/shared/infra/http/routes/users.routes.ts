import { Router } from 'express'
import { getRepository } from 'typeorm'

import CreateUsersService from '@modules/users/services/CreateUsersService'
import User from '@modules/users/infra/typeorm/entities/User'

const usersRoutes = Router()

usersRoutes.post('/', async (req, res) => {
  try {
    const { name, username, email, password } = req.body

    const usersService = new CreateUsersService

    const user = await usersService.execute({
      name,
      username,
      email,
      password
    })

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    res.json(userWithoutPassword)

  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
})

export default usersRoutes;
