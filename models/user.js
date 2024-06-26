const mongoose = require('mongoose')
const {lineupSchema, test} = require('./lineup')

const Schema = mongoose.Schema

const userSchema = new Schema ({
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    lineup: [test] 
  }, {

    timestamps: true,
      
})

module.exports = mongoose.model('User', userSchema)