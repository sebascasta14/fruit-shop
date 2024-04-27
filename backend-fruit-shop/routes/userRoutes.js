const { Router } = require('express')
const UserController = require('../controllers/userController.js')

const router = Router()
const userController = new UserController()

router.get('/user', userController.getAll)
router.get('/user/:username', userController.getByUsername)
router.post('/user', userController.create)
router.delete('/user/:username', userController.delete)

router.post('/login', userController.login)

module.exports = router
