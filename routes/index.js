var express = require('express')
var router = express.Router()

const pokemonController = require('../controllers/pokemon')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pokedex', pokemon: null })
})

router.post('/', async function(req, res, next) {
  try {
    const pokemon = req.body.pokemon
    const data = await pokemonController.fetchPokemon(pokemon)
    res.render('index', { title: 'Pokedex', pokemon: data })
  } catch (error) {
    next(error)
  }
})

module.exports = router
