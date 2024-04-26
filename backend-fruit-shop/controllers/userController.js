import { validateUser, validatePartialUser } from '../schemas/users.js'
import { UserModel } from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
const JWT_SECRET = process.env.JWT_SECRET ?? ''

class UserController {
  constructor () {
    this.userModel = UserModel
  }

  getAll = async (req, res) => {
    const users = await this.userModel.getAll()
    res.json(users)
  }

  getByUsername = async (req, res) => {
    const { username } = req.params
    const user = await this.userModel.getByUsername({ username })
    if (user) return res.json(user)
    res.status(404).json({ message: 'User not found' })
  }

  create = async (req, res) => {
    const result = validateUser(req.body)
    const hashPassword = await bcrypt.hash(result.password, 10)
    const newResult = { password: hashPassword, ...result }
    if (!newResult.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newUser = await this.userModel.create({ input: newResult.data })
    res.status(201).json(newUser)
  }

  update = async (req, res) => {
    let hashedPassword
    const result = validatePartialUser(req.body)
    const newResult = { ...result }
    if (result.password) {
      hashedPassword = await bcrypt.hash(result.password, 10)
      newResult.password = hashedPassword
    }
    if (!newResult.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { username } = req.params
    const updatedUser = await this.userModel.update({ username, input: newResult.data })
    return res.json(updatedUser)
  }

  delete = async (req, res) => {
    const { username } = req.params
    const result = await this.userModel.delete({ username })
    if (result === false) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.json({ message: 'User deleted' })
  }

  login = async (req, res) => {
    const { username, password } = req.params
    const user = await this.userModel.findOne({ username })
    try {
      if (!user) {
        res.status(404).json({ message: 'User not found' })
      }
      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        res.status(401).json({ message: 'Incorrect Password' })
      }
      const token = jwt.sign({
        id: user.id,
        username: user.username
      }, JWT_SECRET, { expiresIn: '1h' })
      user.password = null
      res.send({
        "status": "success",
        "token": token,
        "user": user
      })
    } catch (err) {
      res.status(403).json({ message: 'Error logging in' })
    }
  }

  validateToken = async (req, res, next) => {
    const bearerToken = req.headers["authorization"]
    if (!bearerToken) {
      res.status(401).json({ message: 'Token does not exist' })
    }
    const token = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' })
      }
      req.id = decoded.id
      next()
    })
  }
}

export default UserController
