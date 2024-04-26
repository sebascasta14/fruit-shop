import { validateFruit, validatePartialFruit } from '../schemas/fruits.js'
import { FruitModel } from '../models/Fruit.js'

class FruitController {
  constructor () {
    this.fruitModel = FruitModel
  }

  getAll = async (req, res) => {
    const fruits = await this.fruitModel.getAll()
    res.json(fruits)
  }

  getByName = async (req, res) => {
    const { name } = req.params
    const fruit = await this.fruitModel.getByName({ name })
    if (fruit) return res.json(fruit)
    res.status(404).json({ message: 'Fruit not found' })
  }

  create = async (req, res) => {
    const result = validateFruit(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newFruit = await this.fruitModel.create({ input: result.data })
    res.status(201).json(newFruit)
  }

  update = async (req, res) => {
    const result = validatePartialFruit(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { name } = req.params
    const updatedFruit = await this.fruitModel.update({ name, input: result.data })
    return res.json(updatedFruit)
  }

  delete = async (req, res) => {
    const { name } = req.params
    const result = await this.fruitModel.delete({ name })
    if (result === false) {
      return res.status(404).json({ message: 'Fruit not found' })
    }
    return res.json({ message: 'Fruit deleted' })
  }
}
export default FruitController
