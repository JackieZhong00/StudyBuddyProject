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

    //fetches user using email, return user document with salt and pass
    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    )
    //if user does not exist, send status code 400
    if (!user) {
      return res.sendStatus(400)
    }

    //if auth property exists on user document and the salt is of string type,  get expected hash
    if (user.authentication && typeof user.authentication.salt === 'string') {
      const expectedHash = authentication(user.authentication.salt, password)
      if (expectedHash !== user.authentication.password) {
        //if expectedHash doesn't match hash value stored in password property of document, send 403 error
        return res.sendStatus(403)
      }
    }
    //create salt and use it to create sessionToken
    if (user.authentication) {
      const salt = random()
      user.authentication.sessionToken = authentication(
        salt,
        user._id.toString()
      )

      //pass sessionToken into response as part of cookie
      await user.save()
      res.cookie('JACKIE-AUTH', user.authentication.sessionToken, {
        domain: 'localhost',
        path: '/',
        maxAge: 2*60*60*1000 //expires 2 hours from current time
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
    //extract user inputs from request body, if either form input is missing, respond w/ 400 error
    const { email, password, username } = req.body
    if (!email || !password || !username) {
      return res.sendStatus(400)
    }
    //check to see is user already exists, if user exists, respond w/ 400 error
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      res.sendStatus(400)
    }

    //generate salt for user password
    const salt = random()
    //create user document and return 200 status
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

