const container = document.querySelector(".container");
const search = document.querySelector(".search"); 
const errPokemon = document.querySelector(".errPokemon"); 
const errPage = document.querySelector(".errPage"); 
const btn_home = document.querySelector(".home"); 
const btn_direction = document.querySelector(".btn_direction"); 
const btn_search = document.querySelector(".bi-search"); 
const plataforma = navigator.platform; // "Win32", "Linux x86_64", "iPhone", etc. const ehDispositivoMovel = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); 

let cleanCard = false; 
let favoriteIcon = false; 
let favoritePokemons = []; 
let typePokemon let count = 20; 
let searchNamePokemon = ''; 
const colorPokemon = [ 
  { name: "water", color: "#729EC5" }, 
  { name: "fire", color: "#DF962A" }, 
  { name: "poison", color: '#A70153' }, 
  { name: "electric", color: "#D2D266" }, 
  { name: "grass", color: "#6FBB4E" }, 
  { name: "flying", color: "#BDE8E8" }, 
  { name: "ghost", color: "#763354" }, 
  { name: "ice", color: "#9FC1DF" }, 
  { name: "dragon", color: "#FDBB76" }, 
  { name: "psychic", color: "#B220B2" }, 
  { name: "rock", color: "#644628" }, 
  { name: "fighting", color: "#DBC6C6" }, 
  { name: "bug", color: "#8CE88C" }, 
  { name: "normal", color: "#B79572" }, 
  { name: "fairy", color: "#EA9999" }, 
  ];

search.addEventListener("input", () => { 
 const value = search.value.toLowerCase() 
 searchNamePokemon = value; }) 
  
btn_home.addEventListener("click", () => { 
  errPokemon.style.display = 'none'; 
  cleanCard = true ; 
  favoriteIcon = false; 
  countPokemon(); }) 
  
btn_search.addEventListener("click", () => { 
  cleanCard = true; 
  getPokemon(searchNamePokemon); }) 
  
search.addEventListener("keydown", (event) => { 
  plataforma ehDispositivoMovel;
  if(event.key === 'Enter'){ 
    cleanCard = true; 
    getPokemon(searchNamePokemon); } 
}) 
  
errPage.addEventListener('click', () => { 
  errPokemon.style.display = 'none'; 
  countPokemon() }) 
  
const countPokemon = async () => { 
  for (let i = 1; i <= count; i++) { 
    await getPokemon(i) } } 
  
const countPokemonFavorites = async () => { 
  if (favoritePokemons.length === 0) { 
    favoriteIcon = false; return countPokemon(); 
  } else { 
    for (let i = 0; i < favoritePokemons.length; i++) { 
      favoriteIcon = true; 
      await getPokemon(favoritePokemons[i]) } 
  } } 
  
const getPokemon = async (id) => { 
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`; 
  await fetch(url).then(response => { 
    if (!response.ok) { 
      while (container.firstChild) { 
        container.removeChild(container.firstChild); 
      } 
      searchNamePokemon = ''; 
      search.value = ''; 
      errPokemon.style.display = 'flex'; 
      btn_direction.style.display = 'none'; 
      throw new Error('erro ao obter dados'); 
    } 
    return response.json(); 
  }).then(data => { 
    errPokemon.style.display = 'none'; 
    searchNamePokemon = ''; 
    infoPokemon(data) }); 
} 
  countPokemon(); 
const infoPokemon = async (info) => { 
  const div = document.createElement("div"); 
  let icon = `<i class="bi bi-heart"></i>`; 
  const type1 = info.types[0].type.name; 
  let type2 = info.types[1]?.type?.name; 
  let gifPokemon = info.sprites.versions["generation-v"]["black-white"].animated.front_default; 
  
  if (!gifPokemon) { 
    gifPokemon = info.sprites.front_default } 
  div.classList.add("cards"); 
  div.style.background; 
  
  switch (true) { 
    case cleanCard === true: 
      while (container.firstChild) { 
        container.removeChild(container.firstChild); 
      } 
      cleanCard = false; 
    case favoriteIcon === true: 
      icon = `<i class="bi bi-heart-fill"></i>`; 
      btn_direction.style.display = 'none'; 
      break; 
    case favoriteIcon === false: 
      btn_direction.style.display = 'flex'; 
      break 
  } 
  
  colorPokemon.filter(type => { 
    if (type.name === type1 && (type1 != undefined)) { 
      typePokemon = type1; 
      div.style.background = type.color; 
    } else if (type1 == (undefined || null)) {
      if (type.name === type2) { 
        typePokemon = type2; 
        div.style.background = type.color; } 
    } }); 
  
  const cardInfo = ` <img src="${gifPokemon}" class="image"> 
  <div class="infoPokemon"> <span class="id">#${info.id}</span> 
  <span class="type">${typePokemon}</span> 
  <span id="${info.id}" class="favorite">${icon}</span> 
  <span class="name">${info.name.toUpperCase()}</span> </div> ` ;
  
  div.innerHTML = cardInfo; 
  container.appendChild(div); 
  
  if(ehDispositivoMovel){ 
    div.style.pointerEvents = 'none'; 
  } 
  const favorite = document.getElementById(info.id); 
  favorite.addEventListener('click', async () => { 
    await favoritePokemon(info.id); 
    if (favorite.innerHTML === icon) { 
      favorite.innerHTML = `<i class="bi bi-heart-fill"></i>`; 
    } else { 
      favorite.innerHTML = icon; } 
  }) } 
  
const favoritePokemon = async (id) => { 
  if (favoritePokemons.length === 0) { 
    favoritePokemons.push(id); 
    console.log('pokemon adicionado na lista de favorito') 
  } else { 
    for (const items of favoritePokemons) { 
      if (id === items) { 
        const newArray = favoritePokemons.filter((item) => item != id) 
          favoritePokemons = newArray; favoriteMyPokemon() return; 
      } } 
    favoritePokemons.push(id); } 
} 
  
const favoriteMyPokemon = () => { 
  cleanCard = true; 
  countPokemonFavorites(); 
} 
  
const all_pokemon = async () => { 
  const addPokemons = 10; 
  const addPages = count + addPokemons; 
  const countPages = count + 1; 
  
  for (let i = countPages; i <= addPages; i++) { 
    await getPokemon(i) } 
  
  count = addPages; 
  return; 
}
