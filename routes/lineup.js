var express = require('express')
var router = express.Router()

const pokemonController = require('../controllers/pokemon')

router.get('/lineup', function(req, res, next) {
    res.render('lineup', { title: 'Pokedex' })
})
  
router.post('/lineup', async function(req, res, next) {
    const pokemonName = req.body.pokemonId
    await savePokemon(pokemonName)
    res.redirect('/lineup')
})

router.get('/lineup', pokemonController.getLineup)

module.exports = router