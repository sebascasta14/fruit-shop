import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils.js'

const users = readJSON('./users.json')

export class UserModel {
  static async getAll () {
    return users
  }

  static async getByUsername ({ username }) {
    const user = users.find(user => user.username === username)
    return user
  }

  static async create ({ input }) {
    const newUser = {
      id: randomUUID(),
      ...input
    }
    users.push(newUser)
    return newUser
  }

  static async delete ({ username }) {
    const userIndex = users.findIndex(user => user.username === username)
    if (userIndex === -1) return false

    users.splice(userIndex, 1)
    return true
  }

  static async update ({ username, input }) {
    const userIndex = users.findIndex(user => user.username === username)
    if (userIndex === -1) return false

    users[userIndex] = {
      ...users[userIndex],
      ...input
    }
    return users[userIndex]
  }
}
