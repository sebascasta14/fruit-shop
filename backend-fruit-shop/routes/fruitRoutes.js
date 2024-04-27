const { Router } = require('express')
const FruitController = require('../controllers/fruitController.js')

const router = Router()
const fruitController = new FruitController()

router.get('/fruit', fruitController.getAll)
router.get('/fruit/:name', fruitController.getByName)
router.post('/fruit', fruitController.create)
router.delete('/fruit/:name', fruitController.delete)

module.exports = router
