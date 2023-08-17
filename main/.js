"use strict";

const openDbRequest = indexedDB.open("pokedex_db", 1);

openDbRequest.onupgradeneeded = function(event) {
    const db = event.target.result;
    const store = db.createObjectStore("pokemons", { keyPath: "id" });
};

openDbRequest.onerror = function(event) {
    console.error("Error opening IndexedDB", event.target.error);
};

async function fetchAndCachePokemons() {
    const pokedexUrl = "https://pokeapi.co/api/v2/pokemon";
    const response = await fetch(pokedexUrl);
    const data = await response.json();

    const pokemons = data.results;

    const db = openDbRequest.result;
    const transaction = db.transaction("pokemons", "readwrite");
    const store = transaction.objectStore("pokemons");

    for (const pokemon of pokemons) {
        store.put(pokemon);
    }

    alert("Pokémon data fetched and cached!");
}

function displayCachedPokemons() {
    const cardsContainer = document.querySelector(".pokemon-cards-container");
    cardsContainer.innerHTML = "";

    const db = openDbRequest.result;
    const transaction = db.transaction("pokemons", "readonly");
    const store = transaction.objectStore("pokemons");

    store.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            const pokemon = cursor.value;
            const card = document.createElement("div");
            card.className = "pokemon-card";
            card.textContent = pokemon.name;
            cardsContainer.appendChild(card);
            cursor.continue();
        }
    };
}

document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById("fetchButton");
    const displayButton = document.getElementById("displayButton");

    fetchButton.addEventListener("click", fetchAndCachePokemons);
    displayButton.addEventListener("click", displayCachedPokemons);
});