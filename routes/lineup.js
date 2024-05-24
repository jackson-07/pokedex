var express = require('express')
var router = express.Router()

const pokemonController = require('../controllers/pokemon')
const lineup = require('../models/lineup')
const user = require('../models/user')
const pokemon = require('../models/pokemon')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/users/:id/lineup', ensureLoggedIn, function(req, res, next) {
    const userId = req.user.id;
    // const user = user.findById(req.params.id)
    console.log(req.user)
    res.render('lineup', { userId: userId, lineup: [] })
})
  
router.post('/users/:id/lineup', ensureLoggedIn, async function(req, res, next) {
    
    const pokemonName = req.body.pokemonId
    await pokemonController.savePokemon(pokemonName)
    res.redirect('/lineup')
})

router.get('/user/:id/lineup', ensureLoggedIn, pokemonController.getLineup)

module.exports = router