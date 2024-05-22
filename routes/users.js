var express = require('express')
var router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const session = require('express-session')
const pokemonController = require('../controllers/pokemon')

router.get('/user', function(req, res, next) {
  res.render('user', { title: 'Pokedex', pokemon: null })
})

router.post('/user', pokemonController.fetchAllPokemon)

router.get('/user', pokemonController.renderAllPokemon)

router.get('/auth/google', passport.authenticate(

  'google',
  {
    scope: ['profile', 'email'],

  }
))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/user',
    failureRedirect: '/user'
  }
))

router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/')
  })
})

module.exports = router
