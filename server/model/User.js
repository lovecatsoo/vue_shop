const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Schema = mongoose.Schema

// Creat Schema
const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  status: {
    type: Boolean,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('users', UserSchema)
