import { Router } from 'express'
import UserController from '../controllers/userController.js'

const router = Router()
const userController = new UserController()

router.get('/user', userController.getAll)
router.get('/user/:username', userController.getByUsername)
router.post('/user', userController.create)
router.patch('/user/:username', userController.update)
router.delete('/user/:username', userController.delete)

router.post('/login', userController.login)

export default router
