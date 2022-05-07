import punctuateArray from '../util/punctuateArray.js'
import convertToTitleCase from '../util/convertToTitleCase.js';
import pokemonNames from '../util/pokemonNames.js';

/* const for specified elements for readability */
const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon'
// const select = document.querySelector('.pokemonList');
const searchInput = document.querySelector('.searchInput');
const searchSubmit = document.querySelector('.searchSubmit');
const pokemonNameTitle = document.querySelector('.pokemonTitle');
const imgContainer = document.querySelector('.pokemon-img');
const typeContainer = document.querySelector('#type');
const hpContainer = document.querySelector('#hp');
const attackContainer = document.querySelector('#attack');
const defenseContainer = document.querySelector('#defense');
const heightContainer = document.querySelector('#height');
const weightContainer = document.querySelector('#weight');
const knownAbilitiesContainer = document.querySelector('#knownAbilities');
const hiddenAbilitiesContainer = document.querySelector('#hiddenAbilities');

const getPokemonInfo = (url) => {
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      /* storing data in vars from pokemon data */
      let svgUrl = data.sprites.other.dream_world.front_default;
      let pokemonName = data.name;
      let elementType = data.types.map(obj => obj.type.name);
      console.log(elementType);
      let hp = data.stats.filter(item => item.stat.name === 'hp')[0].base_stat;
      let attack = data.stats.filter(item => item.stat.name === 'attack')[0].base_stat;
      let defense = data.stats.filter(item => item.stat.name === 'defense')[0].base_stat;
      let heightNum = Number(data.height * 0.1).toFixed(1);
      let weightNum = Number(data.weight * 0.1).toFixed(1);
      let knownAbilitiesArray = data.abilities.filter(obj => obj.is_hidden === false).map(obj => obj.ability.name);
      let hiddenAbilitiesArray = data.abilities.filter(obj => obj.is_hidden === true).map(obj => obj.ability.name);
  
      /* put info on the page */
      imgContainer.src = svgUrl;
      imgContainer.alt = pokemonName;
      pokemonNameTitle.textContent = convertToTitleCase(pokemonName);
      typeContainer.textContent = punctuateArray(elementType)
      hpContainer.textContent = hp;
      attackContainer.textContent = attack;
      defenseContainer.textContent = defense;
      heightContainer.textContent = `${heightNum} meters`;
      weightContainer.textContent = `${weightNum} kilograms`;
      knownAbilitiesContainer.textContent = punctuateArray(knownAbilitiesArray);
      hiddenAbilitiesContainer.textContent = hiddenAbilitiesArray.length > 0 ? punctuateArray(hiddenAbilitiesArray) : 'none';
    });
}

  searchSubmit.addEventListener('click', event => {
    event.preventDefault();
    let pokemonUrl = `${POKEMON_URL}/${searchInput.value.toLowerCase()}`;
    if (pokemonNames.includes(searchInput.value.toLowerCase())) {
      getPokemonInfo(pokemonUrl);
    }
    else {
      alert('Please make sure your spelling is correct.')
    }
})




// function displayTypes (types) {
//   for (let i = 0; i < types.length; i++) {
//     typesContainer.textContent += convertToTitleCase(types[i]);
//      console.log(types[i])
//   }
//   select.addEventListener('change', () => {
//     while (typesContainer.lastChild) {
//       typesContainer.removeChild(typesContainer.lastChild);
//     }
//   })
// }

// function createSpanElementType (types) {
//     for (let i=0;i<types.length;i++) {
//      const span = document.createElement('span');
//      span.className = "elementType"
//      span.textContent = convertToTitleCase(types[i]);
//      typesContainer.appendChild(span);
//    }
//     select.addEventListener('change', () => {
//       while (typesContainer.lastChild) {
//         typesContainer.removeChild(typesContainer.lastChild);
//       }
//     })
//   }