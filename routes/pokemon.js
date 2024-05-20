var express = require('express')
var router = express.Router()

const pokemonController = require('../controllers/pokemon')

router.get('/pokemon/:id', async function (req, res, next) {
    try {
        const pokemonId = req.params.id
        const data = await pokemonController.fetchPokemon(pokemonId)
        res.render('pokemon', { title: 'Pokedex', pokemon: data })
    } catch (error) {
        next(error)
    }
})

module.exports = router