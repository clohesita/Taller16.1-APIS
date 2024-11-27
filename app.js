// URL de la PokeAPI para obtener una lista de 20 Pokémon
const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';

// Función para cargar los Pokémon
function loadPokemons() {
    fetch(url)
        .then(response => response.json())  // Convertir la respuesta a JSON
        .then(data => {
            const pokemonList = document.getElementById('pokemon-list');
            pokemonList.innerHTML = ''; // Limpiar cualquier contenido previo

            // Iterar sobre los Pokémon recibidos
            data.results.forEach(pokemon => {
                // Crear una tarjeta para cada Pokémon
                const pokemonCard = document.createElement('div');
                pokemonCard.classList.add('pokemon-card');
                pokemonCard.setAttribute('data-id', pokemon.name);  // Establecer el nombre como un atributo

                // Obtener la información detallada del Pokémon
                fetch(pokemon.url)
                    .then(res => res.json())
                    .then(pokemonData => {
                        // Obtener el nombre, la imagen, el peso, la altura, el tipo y las estadísticas del Pokémon
                        const name = pokemonData.name;
                        const imageUrl = pokemonData.sprites.front_default;
                        const weight = pokemonData.weight / 10; // Convertir peso a kilogramos
                        const height = pokemonData.height / 10; // Convertir altura a metros
                        const types = pokemonData.types.map(type => type.type.name).join(', ');
                        const stats = pokemonData.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');

                        // Añadir la información a la tarjeta
                        pokemonCard.innerHTML = `
                            <img src="${imageUrl}" alt="${name}">
                            <h3>${name.charAt(0).toUpperCase() + name.slice(1)}</h3>
                        `;

                        // Añadir la tarjeta al contenedor
                        pokemonList.appendChild(pokemonCard);

                        // Evento para mostrar el modal con los detalles del Pokémon
                        pokemonCard.addEventListener('click', () => {
                            // Mostrar el modal
                            showModal(name, imageUrl, weight, height, types, stats);
                        });
                    })
                    .catch(error => {
                        console.error('Error al obtener los detalles del Pokémon:', error);
                    });
            });
        })
        .catch(error => {
            console.error('Error al cargar la lista de Pokémon:', error);
        });
}

// Función para mostrar el modal con los detalles del Pokémon
function showModal(name, imageUrl, weight, height, types, stats) {
    // Mostrar el modal
    const modal = document.getElementById('pokemon-modal');
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonImage = document.getElementById('pokemon-image');
    const pokemonWeight = document.getElementById('pokemon-weight');
    const pokemonHeight = document.getElementById('pokemon-height');
    const pokemonTypes = document.getElementById('pokemon-types');
    const pokemonStats = document.getElementById('pokemon-stats');

    // Asignar los valores al modal
    pokemonName.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    pokemonImage.src = imageUrl;
    pokemonWeight.textContent = weight;
    pokemonHeight.textContent = height;
    pokemonTypes.textContent = types;
    pokemonStats.textContent = stats;

    // Mostrar el modal
    modal.style.display = 'block';
}

// Función para cerrar el modal
const closeModal = document.getElementById('close-modal');
closeModal.addEventListener('click', () => {
    const modal = document.getElementById('pokemon-modal');
    modal.style.display = 'none'; // Ocultar el modal
});

// Cerrar el modal si el usuario hace clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    const modal = document.getElementById('pokemon-modal');
    if (event.target === modal) {
        modal.style.display = 'none'; // Ocultar el modal si se hace clic fuera de él
    }
});

// Cargar los Pokémon al iniciar la página
window.onload = loadPokemons;
