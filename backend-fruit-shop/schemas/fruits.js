const mongoose = require('mongoose')

const FruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: Number,
  image: String
})

module.exports = mongoose.model('fruit', FruitSchema)
