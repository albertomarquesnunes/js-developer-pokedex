const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onclick="loadDetail(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail" >
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}
function convertPokemonToDetail(pokemon) {
    return `
        <li class="pokemonDetail ${pokemon.type}" >
            
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>
             
            <div class="detail" >
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
                     <div class="descrition">
                     <table>
                        <tr>
                            <td><strong>About</strong></td>
                        </tr>
                        <tr>
                            <td colspan="2"><hr></td>
                        </tr>
                        <tr>
                            <td>Height:</td>
                            <td>${pokemon.height}m</td>
                        </tr>
                        <tr>
                            <td>Weight:</td>
                            <td>${pokemon.weight}kg</td>
                        </tr>
                        <tr>
                            <td>Abilities:</td>
                            <td>${pokemon.abilities}</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><strong>Stats</strong></td>
                        </tr>
                        <tr>
                            <td colspan="2"><hr></td>
                        </tr>
                        <tr>
                            <td>HP</td>
                            <td>${pokemon.stats[0]}</td>
                        </tr>
                        <tr>
                            <td>Attack</td>
                            <td>${pokemon.stats[1]}</td>
                        </tr>
                        <tr>
                            <td>Defense</td>
                            <td>${pokemon.stats[2]}</td>
                        </tr>
                        <tr>
                            <td>Special Attack</td>
                            <td>${pokemon.stats[3]}</td>
                        </tr>
                        <tr>
                            <td>Special Defense</td>
                            <td>${pokemon.stats[4]}</td>
                        </tr>
                        <tr>
                            <td>Speed</td>
                            <td>${pokemon.stats[5]}</td>
                        </tr>
                   </table>
                  </div>
            </div>
        </li>
    `
}
function loadDetail(pokemon) {

    console.log(pokemon);
    pokeApi.getPokemon(pokemon).then((pokemon = []) => {
        console.log(pokemon);
        const newHtml = convertPokemonToDetail(pokemon)
        pokemonList.innerHTML = newHtml
    });
    loadMoreButton.innerText="Go Back"
    loadMoreButton.addEventListener('click', () => {
        location.reload();
    });
    pokemonList.className = "pokemonListDetail";

}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    });
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})