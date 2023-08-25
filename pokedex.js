
import '../app.css';

import Typed from 'typed.js';

// Expose Typed globally
window.Typed = Typed;

window.Pokedex = require("pokeapi-js-wrapper")
"use strict";

// Define a class responsible for fetching Pokémon data
class PokemonService {

    constructor() {
        this.pokedex = new Pokedex.Pokedex();
        this.offset = 0;
        this.limit = 50;
        this.totalPokemons = null;
        this.pokemons = [];
    }

    async getPokemonsList() {
        try {
            var promises = []
            // get pokemon name list
            const responseList = await this.pokedex.getPokemonsList({ offset: this.offset, limit: this.limit });
            this.totalPokemons = responseList.count;

            // loop each pokemon to get its detail
            responseList.results.forEach(element => {
                var promise = this.pokedex.getPokemonByName(element.name)    
                promises.push(promise);
            });
            
            const responseDetails = await Promise.all(promises);

            // push the results to this.pokemons array
            this.pokemons = [...this.pokemons, ...responseDetails]

            return responseDetails;
        } catch (error) {
            console.error(error.message);
        }
    }

    isAllPokemonLoaded() {
        if (this.pokemons.length === this.totalPokemons) {
            return true;
        } else {
            return false;
        }
    }

    getTotalPokemons () {
        return this.totalPokemons;
    }

    getTotalLoadedPokemons () {
        return this.pokemons.length;
    }
    
    next() { 
        this.offset += this.limit; 
    }
}

// Define a class responsible for displaying Pokémon cards
class HtmlBuilder {

    constructor(container) {
        this.container = container;
    }
  
    generateBgColorByTypes(types) {
         
    }

    createCard(pokemon) {
        let div = document.createElement("div");
        div.innerHTML = pokemon.name;
        this.container.append(div); 
    }
  
    displayPokemonCards(pokemons) {
        this.container.scrollIntoView({ behavior: "smooth", block: "end" });
        pokemons.forEach(pokemon => this.createCard(pokemon))
    }
}
  
// initiate the app and fetch/display Pokémon cards
async function startApp() {
    const pokemonService = new PokemonService();
    const htmlBuilder = new HtmlBuilder(document.getElementById('content'));
    const nextBtn = document.getElementById('next');
    const loadedPokemonCount = document.getElementById('loaded-pokemons');
    const totalPokemonCount = document.getElementById('total-pokemons');
    
    const loadPokemons = async () => {
        const pokemons = await pokemonService.getPokemonsList();
        htmlBuilder.displayPokemonCards(pokemons);

        if (pokemonService.isAllPokemonLoaded()) {
            nextBtn.disabled = true;
        }
        loadedPokemonCount.textContent = pokemonService.getTotalLoadedPokemons();
        totalPokemonCount.textContent = pokemonService.getTotalPokemons();
    };
    
    // initial load
    try {
        loadPokemons();
    } catch (error) {
        console.error(error.message);
    }

    // implement the next button function
    // or you can implement a "infinite scrolling" like how facebook load the news feed
    nextBtn.addEventListener('click', async () => {
        pokemonService.next();
        loadPokemons();
    })
}
  
// Start the app when the DOM is loaded
document.addEventListener("DOMContentLoaded", startApp);
  
