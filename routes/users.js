var express = require('express')
var router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const session = require('express-session')
const pokemonController = require('../controllers/pokemon')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Pokedex', pokemon: null })
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
    successRedirect: '/',
    failureRedirect: '/'
  }
))

router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/')
  })
})

module.exports = router
