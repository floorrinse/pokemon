const POKEMON_URL = 'https://pokeapi.co/api/v2/pokemon'

const select = document.querySelector('.pokemonList');

fetch(`${POKEMON_URL}?limit=151`)
  .then(res => {
    return res.json();
  })
  .then(data => {
    const allPokemon = data.results;
    // console.log(allPokemon)
    const allPokemonNames = allPokemon.map(pokemon => pokemon.name)
    // console.log(allPokemonNames);
    for (let i = 0; i < allPokemonNames.length; i++) {
      const option = document.createElement('option');
      option.value = allPokemonNames[i];
      option.innerText = allPokemonNames[i];
      select.appendChild(option)
    }
})
const pokemonImg = document.querySelector('.pokemon-img');

const getPokemonImg = (url) => {
  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      let svgUrl = data.sprites.other.dream_world.front_default;
      pokemonImg.src = svgUrl;
    });
}

  select.addEventListener('change', event => {
    let selectedPokemonUrl = `${POKEMON_URL}/${event.target.value}`;
    getPokemonImg(selectedPokemonUrl)
  })


// fetch(`${POKEMON_URL}/${event.target.value}`)
//   .then(res => {
//     return res.json();
//   })
//   .then(data => {
//     // console.log(data.sprites.other.dream_world.front_default)
//     let svgUrl = data.sprites.other.dream_world.front_default;
//     pokemonImg.src = svgUrl;
//   });

