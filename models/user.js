const mongoose = require('mongoose')
const lineup = require('./lineup')

const Schema = mongoose.Schema

const userSchema = new Schema ({
      name: String,
      googleId: {
        type: String,
        required: true
      },
      email: String,
      avatar: String
    }, {
      timestamps: true,
      lineup: [lineup]
})

module.exports = mongoose.model('User', userSchema)