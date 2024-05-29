const pokemon = require('../models/pokemon')
const Pokemon = require('../models/pokemon')
const User = require('../models/user')

module.exports = {
  fetchPokemon,
  renderPokemon,
  savePokemon,
  addToLineup,
  removeFromLineup,


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
  const pokemon = await Pokemon.findOne({ id: pokemonID })
  const user = await User.findById(userId)
  const newLineup = []
  for (let i = 0; i < user.lineup.length; i++) {
    if (pokemonID != user.lineup[i].id) {

      newLineup.push(user.lineup[i])
    }

  }


  user.lineup = newLineup

  await user.save()

}