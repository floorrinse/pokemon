const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon'

const select = document.querySelector('.pokemonList');

fetch(`${POKEMON_URL}?limit=151`)
  .then(res => {
    return res.json();
  })
  .then(data => {
    const allPokemon = data.results;
    // console.log(allPokemon)
    const allPokemonNames = allPokemon.map(pokemon => pokemon.name[0].toUpperCase() + pokemon.name.slice(1)).sort();
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
      console.log(data);
      /* const for specified elements for readability */
      const imgContainer = document.querySelector('.pokemon-img');
      const typeContainer = document.querySelector('#type');
      const experienceContainer = document.querySelector('#experience');
      const heightContainer = document.querySelector('#height');
      const weightContainer = document.querySelector('#weight');
      const knownAbilitiesContainer = document.querySelector('#knownAbilities');
      const hiddenAbilitiesContainer = document.querySelector('#hiddenAbilities');

      /* storing data in vars from pokemon data */
      let svgUrl = data.sprites.other.dream_world.front_default;
      let elementType = data.types.map(obj => obj.type.name);
      let baseExp = data.base_experience;
      let heightNum = Number(data.height * 0.1).toFixed(1);
      let weightNum = Number(data.weight * 0.1).toFixed(1);
      let knownAbilitiesArray = data.abilities.filter(obj => obj.is_hidden === false).map(obj => obj.ability.name);
      let hiddenAbilitiesArray = data.abilities.filter(obj => obj.is_hidden === true).map(obj => obj.ability.name);

      //TO-DO: put below util func in a util folder?
      //TO-DO: account for dashes between words
      /* util func to display array items */
      function displayArrayItems (array) {
        let itemsString = ``; //TO-DO: figure out how to put a comma into every entry except for ending entry
        for (let item of array) {
          itemsString += `${item[0].toUpperCase()}` + `${item.slice(1)} `
        }
        return itemsString;
      }
  
      /* put info on the page */
      imgContainer.src = svgUrl;
      typeContainer.textContent = `Type: ${displayArrayItems(elementType)}`;
      experienceContainer.textContent = `Base Exp: ${baseExp}`
      heightContainer.textContent = `Height: ${heightNum} metres`
      weightContainer.textContent = `Weight: ${weightNum} kilograms`
      knownAbilitiesContainer.textContent = `Abilities: ${displayArrayItems(knownAbilitiesArray)}`
      hiddenAbilitiesContainer.textContent = hiddenAbilitiesArray.length > 0 ? `Hidden Abilities: ${displayArrayItems(hiddenAbilitiesArray)}` : `Hidden Abilities: None`
    });
}

  select.addEventListener('change', event => {
    let selectedPokemonUrl = `${POKEMON_URL}/${event.target.value.toLowerCase()}`;
    getPokemonInfo(selectedPokemonUrl);

    const pokemonNameLabel = document.querySelector('#name');
    pokemonNameLabel.textContent = `Name: ${event.target.value[0].toUpperCase()}` + `${event.target.value.slice(1)}`;
  })

