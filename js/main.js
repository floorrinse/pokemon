import displayArrayItems from '../util/displayArrayItems.js'
import convertToTitleCase from '../util/convertToTitleCase.js';

const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon'

/* const for specified elements for readability */
const select = document.querySelector('.pokemonList');
const pokemonContainer = document.querySelector('.img-container');
const pokemonNameTitle = document.querySelector('.pokemonTitle');
const imgContainer = document.querySelector('.pokemon-img');
const hpStat = document.querySelector('.hpStat');
const attackStat = document.querySelector('.attackStat');
const defenseStat = document.querySelector('.defenseStat');
const pokemonNameLabel = document.querySelector('#name');
const typeContainer = document.querySelector('#type');
const experienceContainer = document.querySelector('#experience');
const heightContainer = document.querySelector('#height');
const weightContainer = document.querySelector('#weight');
const knownAbilitiesContainer = document.querySelector('#knownAbilities');
const hiddenAbilitiesContainer = document.querySelector('#hiddenAbilities');
const typesContainer = document.querySelector('.typesContainer');

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
      select.appendChild(option);
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
      pokemonNameLabel.textContent = convertToTitleCase(pokemonName);
      hpStat.textContent = hp;
      attackStat.textContent = attack;
      defenseStat.textContent = defense;
     
      experienceContainer.textContent = baseExp;
      heightContainer.textContent = `${heightNum} metres`;
      weightContainer.textContent = `${weightNum} kilograms`;
      knownAbilitiesContainer.textContent = displayArrayItems(knownAbilitiesArray);
      hiddenAbilitiesContainer.textContent = hiddenAbilitiesArray.length > 0 ? displayArrayItems(hiddenAbilitiesArray) : 'none';
      typesContainer.textContent = displayArrayItems(elementType);
      // createSpanElementType(elementType);
      // displayTypes(elementType)

      // pokemonContainer.innerHTML = `
      //  <div class="card">
      //     <img class="pokemon-img" src="${svgUrl}" alt="" />
      //     </div>
      //     <h2 class="pokemonTitle">${convertToTitleCase(pokemonName)}</h2>
      //     <div class="typesContainer">
      //     <span>${displayArrayItems(elementType)}</span>
      //     </div>
      //     <div class="statsContainer">
      //       <span class="stat-label">HP</span>
      //       <span class="stat-label">Attack</span>
      //       <span class="stat-label">Defense</span>
      //       <span class="hpStat">${hp}</span>
      //       <span class="attackStat">${attack}</span>
      //       <span class="defenseStat">${defense}</span>
      //   </div>
      // `
    });
}

  select.addEventListener('change', event => {
    let selectedPokemonUrl = `${POKEMON_URL}/${event.target.value.toLowerCase()}`;
    getPokemonInfo(selectedPokemonUrl);
    // pokemonNameLabel.textContent = `Name: ${event.target.value[0].toUpperCase()}` + `${event.target.value.slice(1)}`;
  })

function displayTypes (types) {
  for (let i = 0; i < types.length; i++) {
    typesContainer.textContent += convertToTitleCase(types[i]);
     console.log(types[i])
  }
  select.addEventListener('change', () => {
    while (typesContainer.lastChild) {
      typesContainer.removeChild(typesContainer.lastChild);
    }
  })
}

function createSpanElementType (types) {
    for (let i=0;i<types.length;i++) {
     const span = document.createElement('span');
     span.className = "elementType"
     span.textContent = convertToTitleCase(types[i]);
     typesContainer.appendChild(span);
   }
    select.addEventListener('change', () => {
      while (typesContainer.lastChild) {
        typesContainer.removeChild(typesContainer.lastChild);
      }
    })
  }