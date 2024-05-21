var express = require('express')
var router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const session = require('express-session')

const pokemonController = require('../controllers/pokemon')

router.post('/user', async function (req, res, next) {
  const {password, email } = req.body
  const hash = await bcrypt.hash(password, 10)
  const user = new User({
    email, 
    password: hash
  })
  await user.save()
  res.render('user', { title: 'Pokedex'})
}) 

router.post('/login', async function (req, res, next) {
  const { password, email } = req.body
  const user = await User.findOne({ email })
  const validPassword = bcrypt.compare(password, email.password)
  if (validPassword) {
    res.render('user', { title: 'Pokedex' })
  }
  else {
    res.send('incorrect email or password')
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
