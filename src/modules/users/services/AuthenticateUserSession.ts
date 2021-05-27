import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import authConfig from '@config/auth'

interface Request {
  username?: string;
  email?: string;
  password: string
}

interface Response {
  user: User,
  token: string
}

export default class AuthenticateUserSession {
  public async execute({ username, email, password }: Request) : Promise<void> {
    const usersRepository = getRepository(User)

    const { expiresIn, secret } = authConfig.jwt

    function createUserToken(userID: string) {
      const token = sign({}, secret, { subject: userID, expiresIn })

      return token
    }

    async function VerifyUserPassword(userPassword: string) {
      const passwordVerified = await compare(password, userPassword)

      return passwordVerified
    }

    const UserfoundbyUsername = await usersRepository.findOne({ where: { username } })
    const UserfoundbyEmail = await usersRepository.findOne({ where: { email } })


  }
}
