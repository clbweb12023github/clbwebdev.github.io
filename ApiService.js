import Pokedex from 'pokedex-js-wrapper';

const customOptions = {
  
}
const pokedex = new Pokedex.Pokedex(customOptions)

// Function to fetch Pokémon data from the PokeAPI using pokedex-js-wrapper
export async function getPokemonsList(offset = 0, limit = 20) {
    try {
         
    } catch (error) {
        throw new Error("Error fetching Pokémon data from the PokeAPI");
    }
}
 