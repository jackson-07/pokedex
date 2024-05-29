var express = require('express')
var router = express.Router()

const pokemonController = require('../controllers/pokemon')
const lineup = require('../models/lineup')
const user = require('../models/user')
const pokemon = require('../models/pokemon')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/lineup', ensureLoggedIn, async function(req, res, next) {
    const userId = req.user.id
    const User = await user.findById(req.user.id)
    res.render('lineup', { userId: userId, lineup: User.lineup || [] })
})

router.delete('/lineup', ensureLoggedIn, async function (req, res, next) {
    const pokemonID = req.body.pokemonId
    await pokemonController.removeFromLineup(pokemonID, req.user.id)
    res.redirect('/lineup')
})
  
router.post('/lineup', ensureLoggedIn, async function(req, res, next) {
    const pokemonID = req.body.pokemonId
    await pokemonController.savePokemon(pokemonID)
    await pokemonController.addToLineup(pokemonID, req.user.id)
    res.redirect('/lineup')
})



module.exports = router