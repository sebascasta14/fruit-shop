import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils.js'

const fruits = readJSON('./fruits.json')

export class FruitModel {
  static async getAll () {
    return fruits
  }

  static async getByName ({ name }) {
    const fruit = fruits.find(fruit => fruit.name === name)
    return fruit
  }

  static async create ({ input }) {
    const newFruit = {
      id: randomUUID(),
      ...input
    }
    fruits.push(newFruit)
    return newFruit
  }

  static async delete ({ name }) {
    const fruitIndex = fruits.findIndex(fruit => fruit.name === name)
    if (fruitIndex === -1) return false

    fruits.splice(fruitIndex, 1)
    return true
  }

  static async update ({ name, input }) {
    const fruitIndex = fruits.findIndex(fruit => fruit.name === name)
    if (fruitIndex === -1) return false

    fruits[fruitIndex] = {
      ...fruits[fruitIndex],
      ...input
    }

    return fruits[fruitIndex]
  }
}
