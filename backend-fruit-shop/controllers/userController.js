const UserSchema = require('../schemas/users.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET ?? ''
class userController {
  constructor(){}

  async getAll (req, res) {
    const users = await UserSchema.find()
    res.send(users)
  }

  async getByUsername (req, res) {
    const query = UserSchema.where({username: req.params.username})
    const user = await query.findOne()
    res.send(user)
  }

  async create (req, res) {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    let user = UserSchema({
      id: req.body.id,
      username: req.body.name,
      shoppingcart: req.body.shoppingcart,
      password: hashPassword
    })

    user.save()
      .then((result) => { res.send(result) })
      .catch((err) => {
        if (err.code === 11000) {
          res.send({
            "status": "failed",
            "message": "El correo ya ha sido registrado"
          })
        } else {
          res.send({
            "status": "failed",
            "message": "Error almacenando la informacion" + err.message
          })
        }
      })
  }

  async delete (req, res){
      const username = req.params.username
      UserSchema.deleteOne({username: username}).then(() => {
          res.json({
              "status": "sucess",
              "message": "User deleted successfully"
          })
      }).catch((err) => {
          console.log(err)
          res.json({  
              "status": "failed",
              "message": "Error deleting user"
          })
      })
  }
  
  async login (req, res){
      const username = req.body.username
      const password = req.body.password

      try{
          //Buscar al usuario con el email
          const user = await UserSchema.findOne({username})  
          if(!user){
              res.send( {
                  "status": "error",
                  "message": "El usuario no existe"
              })
          }
          
          //Comparar la contraseña con la que tengo en la base de datos
          const passwordMatch = await bcrypt.compare(password, user.password)
          if(!passwordMatch){
              res.send(  {
                  "status": "error",
                  "message": "Contraseña incorrecta"
              })
          }

          const token = jwt.sign({ 
            username: user.username
          }, JWT_SECRET, { expiresIn: '1h' })

          user.password = null
          
          res.send({
              "status": "success",
              "token": token, 
              "user": user
          })
      }catch(err){
          console.log(err)
          res.send(  {
              "status": "error",
              "message": "Error al iniciar sesion"
          })
      }
  }

  validateToken(req, res, next){
      const bearerToken = req.headers['authorization']
      if(!bearerToken){
          return res.status(401).json({
              "message": "Token no existente"
          })
      }

      const token = bearerToken.startsWith('Bearer ') ? bearerToken.slice(7) : bearerToken
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
          if(err){
              return res.status(401).json({
                  "message": "Token invalido"
              })
          }
          req.userId = decoded.userId
          next()
      })
  } 
}

module.exports = userController
