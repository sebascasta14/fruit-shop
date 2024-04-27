const FruitSchema = require('../schemas/fruits.js')
require('dotenv').config()
class FruitController {
  constructor(){}

  async getAll (req, res){
      const fruits = await FruitSchema.find()
      res.send(fruits)
  }

  async getByName (req, res){
      const query = FruitSchema.where({name: req.params.name})
      const fruit = await query.findOne()
      if(fruit){
          res.status(200).send(fruit)
      }else{
          res.status(404).send({  
              "status": "failed",
              "message": "Not Found"
          })
      }
  }

  async create (req, res){
          let fruit = FruitSchema({
              name: req.body.name,
              price: req.body.price,
              image: req.body.image
          })
      
          fruit.save()
              .then((result) => {res.status(201).send(result)})
              .catch((err) => {
                  if(err.code == 11000){
                      res.status(409).send({  
                          "status": "failed",
                          "message": "El codigo ya ha sido registrado"
                      })
                  }else{
                      res.status(400).send({  
                          "status": "failed",
                          "message": "Error almacenando la informacion" + err,
                      })
                  }
              })
      }

  async delete (req, res){
      const name = req.params.name
      const {deletedCount} = await FruitSchema.deleteOne({name: name})
      if (deletedCount === 0) {
          return res.status(500).json({
                      "status": "failed",
                      "message": "Error deleting fruit"
                  })
      }
      return res.status(200).json({
          "status": "success",
          "message": "fruit deleted successfully"
      })
  }
}

module.exports = FruitController
