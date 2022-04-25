import displayArrayItems from '../util/displayArrayItems.js'
import convertToTitleCase from '../util/convertToTitleCase.js';

const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon'

/* const for specified elements for readability */
const select = document.querySelector('.pokemonList');
const imgContainer = document.querySelector('.pokemon-img');
const pokemonNameLabel = document.querySelector('#name');
const typeContainer = document.querySelector('#type');
const experienceContainer = document.querySelector('#experience');
const heightContainer = document.querySelector('#height');
const weightContainer = document.querySelector('#weight');
const knownAbilitiesContainer = document.querySelector('#knownAbilities');
const hiddenAbilitiesContainer = document.querySelector('#hiddenAbilities');

fetch(`${POKEMON_URL}?limit=151`)
  .then(res => {
    return res.json();
  })
  .then(data => {
    const allPokemon = data.results;
    // console.log(allPokemon)
    const allPokemonNames = allPokemon.map(pokemon => convertToTitleCase(pokemon.name)).sort();
    // console.log(allPokemonNames);
    for (let i = 0; i < allPokemonNames.length; i++) {
      const option = document.createElement('option');
      option.value = allPokemonNames[i];
      option.innerText = allPokemonNames[i];
      select.appendChild(option)
    }
})

const getPokemonInfo = (url) => {
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      // console.log(data);

      /* storing data in vars from pokemon data */
      let svgUrl = data.sprites.other.dream_world.front_default;
      let pokemonName = data.name;
      let elementType = data.types.map(obj => obj.type.name);
      let baseExp = data.base_experience;
      let heightNum = Number(data.height * 0.1).toFixed(1);
      let weightNum = Number(data.weight * 0.1).toFixed(1);
      let knownAbilitiesArray = data.abilities.filter(obj => obj.is_hidden === false).map(obj => obj.ability.name);
      console.log(knownAbilitiesArray);
      let hiddenAbilitiesArray = data.abilities.filter(obj => obj.is_hidden === true).map(obj => obj.ability.name);
  
      /* put info on the page */
      imgContainer.src = svgUrl;
      pokemonNameLabel.textContent = convertToTitleCase(pokemonName);
      typeContainer.textContent = displayArrayItems(elementType);
      experienceContainer.textContent = baseExp
      heightContainer.textContent = `${heightNum} metres`
      weightContainer.textContent = `${weightNum} kilograms`
      knownAbilitiesContainer.textContent = displayArrayItems(knownAbilitiesArray)
      hiddenAbilitiesContainer.textContent = hiddenAbilitiesArray.length > 0 ? displayArrayItems(hiddenAbilitiesArray) : 'none'
    });
}

  select.addEventListener('change', event => {
    let selectedPokemonUrl = `${POKEMON_URL}/${event.target.value.toLowerCase()}`;
    getPokemonInfo(selectedPokemonUrl);

    // pokemonNameLabel.textContent = `Name: ${event.target.value[0].toUpperCase()}` + `${event.target.value.slice(1)}`;
  })


