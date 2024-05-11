const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lineupSchema = new Schema ({
    name: String,


})

module.exports = mongoose.model('Lineup', lineupSchema)