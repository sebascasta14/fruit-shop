import { Router } from 'express'
import FruitController from '../controllers/fruitController.js'

const router = Router()
const fruitController = new FruitController()

router.get('/fruit', fruitController.getAll)
router.get('/fruit/:name', fruitController.getByName)
router.post('/fruit', fruitController.create)
router.patch('/fruit/:name', fruitController.update)
router.delete('/fruit/:name', fruitController.delete)

export default router
