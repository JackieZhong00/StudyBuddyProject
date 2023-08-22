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
  router.get('/users', isAuthenticated, getAllUsers)
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser)
  router.patch('/users/:id', isAuthenticated, isOwner, updateUser)
  router.post('/users/:id', isAuthenticated, isOwner, updateUserProfile)
  router.get('/users/:id', isAuthenticated, isOwner, getUserInfo)
  router.post('/users/events/:id', isAuthenticated, isOwner, saveEvent)
}

