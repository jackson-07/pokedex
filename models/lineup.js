const mongoose = require('mongoose')

const Schema = mongoose.Schema

const battleLineupSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    lineup: [{
        pokemon: {
            type: Schema.Types.ObjectId,
            ref: 'pokemon',
            required: true
        },
        name: String, 
        position: {
            type: Number,
            required: true,
            min: 1,
            max: 6
        }
    }]
})

module.exports = mongoose.model('BattleLineup', battleLineupSchema)