const search = document.querySelector('#search');
const number = document.querySelector('#number');
const pokemonImage = document.querySelector('#pokemon-image');
const type = document.querySelectorAll('.type');
const types = document.querySelector('#types');

const typeColors = {
    "rock":     [182, 158,  49],
    "ghost":    [112,  85, 155],
    "steel":    [183, 185, 208],
    "water":    [100, 147, 235],
    "grass":    [116, 203,  72],
    "psychic":  [251,  85, 132],
    "ice":      [154, 214, 223],
    "dark":     [117,  87,  76],
    "fairy":    [230, 158, 172],
    "normal":   [170, 166, 127],
    "fighting": [193,  34,  57],
    "flying":   [168, 145, 236],
    "poison":   [164,  62, 158],
    "ground":   [222, 193, 107],
    "bug":      [167, 183,  35],
    "fire":     [245, 125,  49],
    "electric": [249, 207,  48],
    "dragon":   [112,  55, 255]
}

const fetchApi = async (pkmnName) => {   
    //Joining pokémon names that has more than one word (Mr Mime)
    pkmnNameApi = pkmnName.split(' ').join('-');

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/` + pkmnNameApi.split(' ').join('-'));

    if(response.status === 200){
        const pkmnData = await response.json();
        return pkmnData;
    }

    return pkmnData
}

search.addEventListener('change', async (event) =>{
   const pkmnData = await fetchApi(event.target.value)

   //Validation when Pokémon does not exist
   if(!pkmnData) alert('Pokémon does not exist')

   //Sets pokemon # at the top of the page
   number.innerHTML = '#' + pkmnData.id.toString().padStart(3, '0');

   //Sets pokemon image
   pokemonImage.src = pkmnData.sprites.other.home.front_default;

   //Updates ''Type" bubbles
   types.innerHTML = '';


   pkmnData.types.forEach((t) => {        
        let newType = document.createElement('span');
        let color = typeColors[t.type.name];

        newType.innerHTML = t.type.name;
        newType.classList.add('type');
        newType.style.backgroundColor = `rgb(${color[t.type.name][0]}, ${color[t.type.name][1]}, ${color[t.type.name][2]})`

        types.appendChild(newType);
   })
})