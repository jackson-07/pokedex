const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pokemonSchema = new Schema({
    id: Number,
    num: String,
    name: String,
    img: String,
    types: [String],
    abilities: [String],
    baseStats: {
        hp: Number,
        attack: Number,
        defense: Number,
    },
    sprites: {
        frontDefault: String,
        backDefault: String,
      },
    next_evolution: [
        { String },
        { String }
    ]
}
)

module.exports = mongoose.model('Pokemon', pokemonSchema)