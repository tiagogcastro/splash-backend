import { Router } from 'express';

import AuthenticateUserSession from '@modules/users/services/AuthenticateUserSession'

const sessionsRoutes = Router()

sessionsRoutes.post('/', async (req, res) => {

  const authenticateUser = new AuthenticateUserSession()

})
