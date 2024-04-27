const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: String,
  shoppingcart: String
})

module.exports = mongoose.model('User', UserSchema)
