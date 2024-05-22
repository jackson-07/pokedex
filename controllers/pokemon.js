const Pokemon = require('../models/pokemon')

module.exports = {
  fetchPokemon,
  renderPokemon,
  fetchAllPokemon,
  renderAllPokemon,
  savePokemon,
  
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

async function fetchAllPokemon() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
    const data = await response.json()
    const pokemonList = data.results

    // Fetch details for each Pokémon
    const pokemonDetailsPromises = pokemonList.map(function(pokemon) {
      return fetchPokemon(pokemon.name)
    });
    const pokemonDetails = await Promise.all(pokemonDetailsPromises)

    return pokemonDetails
  } catch (error) {
    console.error('Error:', error)
  }
}

async function renderAllPokemon(req, res) {
  try {
    const allPokemon = await fetchAllPokemon()
    res.render('allPokemon', { pokemon: allPokemon })
  } catch (error) {
    console.error('Error:', error)
  }
}

async function savePokemon(pokemon) {
  try {
    const data = await fetchPokemon(pokemon)

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

    console.log('Pokémon saved:', pokemon)
    return pokemon
  } catch (error) {
    console.error('Error:', error)
  }
}

