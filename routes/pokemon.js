var express = require('express')
var router = express.Router()

const User = require('../models/user')
const pokemonController = require('../controllers/pokemon')

router.get('/home/pokemon/:id', async function (req, res, next) {
    try {
        const pokemonId = req.params.id
        const data = await pokemonController.fetchPokemon(pokemonId)
        res.render('pokemon', { title: 'Pokedex', pokemon: data })
    } catch (error) {
        next(error)
    }
})

module.exports = router