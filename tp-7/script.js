document.addEventListener("DOMContentLoaded", function cargarPagina(){
    obtenerPokemon();
  })

  function obtenerPokemon(limit='limit=151'){
    fetch('https://pokeapi.co/api/v2/pokemon?'+limit)
    .then(res => res.json())
    .then(function(allpokemon){
        allpokemon.results.forEach(function(pokemon){
            obtenerDatosPokemon(pokemon);
        })
    })
  }

  function obtenerMasPokemon(){
    let contenedorDatos = document.querySelector('#filaDeDatos')
    contenedorDatos.innerText = ""
    obtenerPokemon(limit='limit=386')
    document.getElementById("botonMas").style.display = "none";  
  }

  function obtenerDatosPokemon(pokemon){
    let url = pokemon.url
    fetch(url)
    .then(res => res.json())
    .then(function(data){
        renderPokemon(data)
    })
  }

  function renderPokemon(data){
    let pokemonTable = document.getElementById('filaDeDatos');
    let pokemonInfo = document.createElement('tr')
    pokemonInfo.innerHTML = `<th scope='row' class="text-center align-middle">${data.id}</th>
    <td><img src="${data.sprites.front_default}">${data.name.toUpperCase()[0] + data.name.slice(1)}</td>
    <td class="align-middle">${tiposPokemon(data.types)}</td>
    `
    
    pokemonTable.append(pokemonInfo)
  }

  function tiposPokemon(tipos){
    tpsPkmn = ""
    tipos.forEach(function(tipo){
        let typeName = tipo['type']['name'];
        tpsPkmn = tpsPkmn + typeName.toUpperCase()[0] + typeName.slice(1) + " | "
    })
    tpsPkmn = tpsPkmn.slice(0, -2);
    return tpsPkmn
  }
