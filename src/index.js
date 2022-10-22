const container = document.getElementById('container');

const url = "https://pokeapi.co/api/v2/pokemon/";
const limit = 20;
let offset = 0;

createPokemonCard =  (pokemon) => {
    const card = document.createElement('div');
    const name = document.createElement('h2');
    const image = document.createElement('img');
    const xButton = document.createElement('button');
    const xButtonImg = document.createElement('img');
    card.classList.add('card');
    name.innerText = pokemon.name;
    image.src = pokemon.image;
    image.id = "img_" + pokemon.id;
    
    xButtonImg.src = "../assets/cruz.png";
    xButtonImg.width = 25;
    xButtonImg.classList.add('xButtonImg');
    
    xButton.classList.add('xButton');
    xButton.appendChild(xButtonImg);
    xButton.addEventListener('click', async () => {
        confirm("Are you sure you want to delete this pokemon?");
        await card.remove();
        alert("Pokemon deleted!");
        document.getElementById("img_" + pokemon.id).remove();
    }, false);

    card.appendChild(xButton);
    card.appendChild(image);
    card.appendChild(name);

    return card;
};



async function fetchPokemon(pokemon){
    await fetch(pokemon.url)
    .then(res => res.json())
    .then(data => {
        const pokemon = {
            name: data.name.toUpperCase(),
            id: data.id,
            image: data.sprites.front_default,
            type: data.types[0].type.name
        }
        container.appendChild(createPokemonCard(pokemon));
        
    })
}

async function getPokeCards(){
        await fetch(`${url}?limit=${limit}&offset=${offset}`)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(pokemon => {
                fetchPokemon(pokemon);
            });
        })
}

getPokeCards();