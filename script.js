const apiKey = '8ed200f50a6942ca5bc8b5cdec27ff22';
const apiBase = 'https://api.themoviedb.org/3/movie/';
const imgBase = 'https://image.tmdb.org/t/p/w500/';
let movies = [];

// Função para buscar filmes populares
async function fetchPopularMovies() {
    const response = await fetch(`${apiBase}popular?api_key=${apiKey}&language=pt-BR`);
    const data = await response.json();
    movies = data.results;
    return movies;
}

// Função para exibir os filmes no carrossel
async function displayMovies() {
    await fetchPopularMovies();
    const carousel = document.querySelector('.owl-carousel');

    movies.forEach(movie => {
        const item = document.createElement('div');
        item.classList.add('item');
        
        const img = document.createElement('img');
        img.classList.add('box-movie');
        img.src = `${imgBase}${movie.poster_path}`;
        img.alt = movie.title;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');

        const watchButton = document.createElement('button');
        watchButton.classList.add('button');
        watchButton.innerHTML = '<i class="fas fa-play"></i> ASSISTIR AGORA';
        watchButton.onclick = () => watchMovie(movie);

        const infoButton = document.createElement('button');
        infoButton.classList.add('button');
        infoButton.innerHTML = '<i class="fas fa-info-circle"></i> MAIS INFORMAÇÕES';
        infoButton.onclick = () => showMovieInfo(movie);

        buttonsDiv.appendChild(watchButton);
        buttonsDiv.appendChild(infoButton);
        item.appendChild(img);
        item.appendChild(buttonsDiv);
        carousel.appendChild(item);
    });
}

// Função para redirecionar para assistir ao filme
function watchMovie(movie) {
    // Substitua pela URL real de streaming
    window.location.href = `https://example.com/watch/${movie.id}`;
}

// Função para mostrar informações do filme
function showMovieInfo(movie) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2>${movie.title}</h2>
            <p>${movie.overview}</p>
            <p>Avaliação: ${movie.vote_average}</p>
            <p>Data de Lançamento: ${movie.release_date}</p>
        </div>
    `;
    
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
}

// Função para fechar o modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// Inicializando o carrossel
$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
});

// Chama a função para exibir filmes
displayMovies();
