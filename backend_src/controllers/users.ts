import express from 'express'
import mongoose from 'mongoose'
import {
  deleteUserById,
  getUserById,
  getUsers,
  getUserBySessionToken,
} from '../db/users'

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers()
    return res.status(200).json(users)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params
    const deletedUser = await deleteUserById(id)
    return res.json(deletedUser)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params
    const { username } = req.body

    if (!username) {
      return res.sendStatus(400)
    }
    const user = await getUserById(id)

    user.username = username
    await user.save()
    return res.status(200).json(user).end()
  } catch (error) {
    return res.sendStatus(400)
  }
}

export const updateUserProfile = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params
    const { dates, locations, promptResponses } = req.body
    if (!dates || !locations || !promptResponses) {
      return res.sendStatus(400)
    }
    const user = await getUserById(id)
    if (user) {
      user.dates = [...user.dates]
      user.locations = [...user.locations]
      user.promptResponses = [...user.locations]
      await user.save()
    }
  } catch (error) {
    return res.sendStatus(400)
  }
}

export const getUserInfo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params
    const user = await getUserById(id)
    if (!user) {
      return res.sendStatus(404)
    }
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
}


