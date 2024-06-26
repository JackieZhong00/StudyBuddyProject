import express from 'express'
import { get, merge } from 'lodash'

import { getUserBySessionToken } from '../db/users'

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params
    //gets from the request object the id of user, which is assigned to the identity._id key
    const currentUserId = get(req, 'identity._id')
    if (!currentUserId) {
      return console.log('no current user id')
    }
    //if userid is a string but does not match id in url, print error message
    if (typeof currentUserId === 'string' && currentUserId != id) {
      return console.log('no match between userid and id from url')
    }
    next()
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    //fetch the sessionToken, which is under request cookies named 'JACKIE-AUTH'
    const sessionToken = req.cookies['JACKIE-AUTH']

    if (!sessionToken) {
      return console.log('no sessionToken')
    }
    //get the user document using sessionToken,
    const existingUser = await getUserBySessionToken(sessionToken)
    if (!existingUser) {
      return console.log('noexisting user')
    }
    //if user exists, merge user document to request's identity key
    merge(req, { identity: existingUser })
    return next()
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}





