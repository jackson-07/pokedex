var express = require('express')
var router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const session = require('express-session')
const pokemonController = require('../controllers/pokemon')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/home', ensureLoggedIn, function (req, res, next) {
  res.render('home', { title: 'Pokedex', pokemon: null })
})

router.post('/home', ensureLoggedIn, async function(req, res, next) {
  try {
    const pokemon = req.body.pokemon
    const data = await pokemonController.fetchPokemon(pokemon)
    res.render('home', { title: 'Pokedex', pokemon: data })
  } catch (error) {
    next(error)
  }
})

router.get('/auth/google', passport.authenticate(

  'google',
  {
    scope: ['profile', 'email'],

  }
))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/home',
    failureRedirect: '/home'
  }
))

router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/')
  })
})

module.exports = router
