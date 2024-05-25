const mongoose = require('mongoose')

const Schema = mongoose.Schema

const lineupSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true,
      unique: true
    },
    types: [{
      type: String,
      required: true
    }],
    abilities: [{
      name: {
        type: String,
        required: true
      },
    }],
    moves: [{
      type: String,
      required: true
    }],
    stats: [{
      name: {
        type: String,
        required: true
      },
      base_stat: {
        type: Number,
        required: true
      }
    }],
    height: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    sprites: {
      front_default: {
        type: String
      },
      back_default: {
        type: String
      }
  
    },
  
  })

module.exports = { lineupSchema: mongoose.model('Lineup', lineupSchema), test: lineupSchema }