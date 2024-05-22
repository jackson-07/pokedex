var express = require('express')
var router = express.Router()

const pokemonController = require('../controllers/pokemon')

router.get('/lineup', function(req, res, next) {
    res.render('lineup', { title: 'Pokedex' })
})

module.exports = router