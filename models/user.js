const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema ({
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      name: String,
      googleId: {
        type: String,
        required: true
      },
      email: String,
      avatar: String
    }, {
      timestamps: true
})

module.exports = mongoose.model('User', userSchema)