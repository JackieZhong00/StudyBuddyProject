import express from 'express'

import { login, register } from '../controllers/authentication'

export default (router: express.Router) => {
  //post request endpoint for register functionality
  router.post('/auth/register', register)
  //post request endpoint for login functionality
  router.post('/auth/login', login)
}

