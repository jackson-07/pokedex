var express = require('express')
var router = express.Router()

const pokemonController = require('../controllers/pokemon')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pokedex' })
})

router.post('/', pokemonController.fetchPokemon)

router.post('/', pokemonController.savePokemon)

router.post('/', pokemonController.renderPokemon)

// multiple post requests will be an issue, probably.. 

module.exports = router
