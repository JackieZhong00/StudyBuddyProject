import express from 'express'
import { random, authentication } from '../helpers'
import cookieParser from 'cookie-parser'
import { getUserByEmail, createUser } from '../db/users'

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.sendStatus(400)
    }
    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    )
    if (!user) {
      return res.sendStatus(400)
    }
    if (user.authentication && typeof user.authentication.salt === 'string') {
      const expectedHash = authentication(user.authentication.salt, password)
      if (expectedHash !== user.authentication.password) {
        return res.sendStatus(403)
      }
    }
    if (user.authentication) {
      const salt = random()
      user.authentication.sessionToken = authentication(
        salt,
        user._id.toString()
      )

      await user.save()
      res.cookie('JACKIE-AUTH', user.authentication.sessionToken, {
        domain: 'localhost',
        path: '/',
      })
      // console.log(res)
      return res.status(200).json(user).end()
    }
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}



export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body
    if (!email || !password || !username) {
      return res.sendStatus(400)
    }
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      res.sendStatus(400)
    }
    const salt = random()
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    })
    return res.status(200).json(user).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

