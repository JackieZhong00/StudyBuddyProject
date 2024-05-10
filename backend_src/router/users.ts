import express from 'express'
import {
  deleteUser,
  getAllUsers,
  updateUser,
  updateUserProfile,
  getUserInfo,
  saveEvent
} from '../controllers/users'
import { isAuthenticated, isOwner } from '../middlewares'


export default (router: express.Router) => {
  //fetches all users to render userprofiles on explore page
  router.get('/users', isAuthenticated, getAllUsers)
  //deletes user account
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser)
  //updates user profile
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser)
  router.post('/users/:id', isAuthenticated, isOwner, updateUserProfile)

  //fetches user profile for user profile page
  router.get('/users/:id', isAuthenticated, isOwner, getUserInfo)
  //posts calendar event to user profile
  router.post('/users/events/:id', isAuthenticated, isOwner, saveEvent)
}

