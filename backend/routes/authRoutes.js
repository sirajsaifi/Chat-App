import express from 'express'
import { signup, login, logout, forgotPassword, resetPassword } from '.././controllers/authController.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

export default router