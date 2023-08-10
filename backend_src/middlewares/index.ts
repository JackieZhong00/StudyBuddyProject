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
    const currentUserId = get(req, 'identity._id')
    if (!currentUserId) {
      return console.log('no current user id')
    }
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
    const sessionToken = req.cookies['JACKIE-AUTH']
    if (!sessionToken) {
      return console.log(req.cookies)
    }
    const existingUser = await getUserBySessionToken(sessionToken)
    if (!existingUser) {
      return console.log('noexisting user')
    }
    merge(req, { identity: existingUser })
    return next()
  } catch (error) {
    console.log(error)
    res.sendStatus(400)
  }
}

