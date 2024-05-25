const pokemon = require('../models/pokemon')
const Pokemon = require('../models/pokemon')
const User = require('../models/user')

module.exports = {
  fetchPokemon,
  renderPokemon,
  savePokemon,
  addToLineup,
  removeFromLineup,
  getLineup,
  addMove,
  deleteMove

}

async function fetchPokemon(pokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    const data = await response.json()
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

    const pokemon = new Pokemon(pokemonData)
    await pokemon.save()

    return pokemon
  } catch (error) {
    console.error('Error:', error)
  }
}

async function addToLineup(pokemonID, userId) {
   const pokemon = await Pokemon.findOne({id: pokemonID})
   const user = await User.findById(userId)
   user.lineup.push(pokemon)
   await user.save()
}

async function removeFromLineup(pokemonID, userId) {
    const pokemon = await Pokemon.findOne({id: pokemonID})
    const user = await User.findById(userId)
    user.lineup.pop(pokemon)
    await user.save()
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

async function deleteMove (req, res) {
  const move = await Pokemon.findById(req.params.id)
  pokemon.move.pop(req.body.move)
  await move.save()
  res.redirect()
}