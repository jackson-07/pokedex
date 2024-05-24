const pokemon = require('../models/pokemon')
const Pokemon = require('../models/pokemon')
const User = require('../models/user')

module.exports = {
  fetchPokemon,
  renderPokemon,
  savePokemon,
  addToLineup,
  getLineup,
  addMove,
  deleteMove

}

async function fetchPokemon(pokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error('Error:', error)
  }
}

async function renderPokemon(req, res) {
  try {
    const { id } = req.params
    const pokemon = await Pokemon.findOne({ id })

    res.render('pokemon', { pokemon })
  } catch (error) {
    console.error('Error:', error)

  }
}

async function savePokemon(pokemonId) {
  try {
    const data = await fetchPokemon(pokemonId)

    const pokemonData = {
      name: data.name,
      id: data.id,
      types: data.types.map(function(typeInfo) {
        return typeInfo.type.name
      }),
      abilities: data.abilities.map(function(abilityInfo) {
        return {
          name: abilityInfo.ability.name
        }
      }),
      moves: data.moves.map(function(moveInfo) {
        return moveInfo.move.name
      }),
      stats: data.stats.map(function(statInfo) {
        return {
          name: statInfo.stat.name,
          base_stat: statInfo.base_stat
        }
      }),
      height: data.height,
      weight: data.weight,
      sprites: {
        front_default: data.sprites.front_default,
        back_default: data.sprites.back_default
      }
    }
    
    const user = await User.findById(req.params.id)
    addToLineup(pokemonData, user)

    // // const pokemon = new Pokemon(pokemonData)
    // // await pokemon.save()

    // return pokemon
  } catch (error) {
    console.error('Error:', error)
  }
}

async function addToLineup(pokemonData, user) {
   // needs the be users/numbers for id/pokemon or /lineup - look through Movies
   user.lineup.push(req.body.pokemonId)
   await user.save()
   res.redirect(`/users/${id}/lineup`)
}

async function getLineup(req, res, next) {
  try {
    const lineup = await Pokemon.find({})
    res.render('lineup', { lineup })
  } catch (error) {
    next(error)
  }
}

async function addMove(req, res) {
  const move = await Pokemon.findById(req.params.id)
  pokemon.move.push(req.body.move)
  await move.save()
  res.redirect()
}

async function deleteMove () {

}