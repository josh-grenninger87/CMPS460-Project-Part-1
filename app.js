const addMovieBtn = document.getElementById("addMovieBtn");
const movieTitle = document.getElementById("movieTitle");
const movieGenre = document.getElementById("movieGenre");
const movieList = document.getElementById("movieList");

let movies = [];

function renderMovies() {
  movieList.innerHTML = "";

  movies.forEach((movie, index) => {
    const li = document.createElement("li");
    li.className = "movie-item";

    li.innerHTML = `
      <div class="movie-info">
        <span class="${movie.watched ? "watched" : ""}"><strong>${movie.title}</strong></span>
        <small>${movie.genre}</small>
      </div>
      <div class="actions">
        <button onclick="toggleWatched(${index})">
          ${movie.watched ? "Unwatch" : "Watched"}
        </button>
        <button onclick="deleteMovie(${index})">Delete</button>
      </div>
    `;

    movieList.appendChild(li);
  });
}

function addMovie() {
  const title = movieTitle.value.trim();
  const genre = movieGenre.value;

  if (title === "") {
    alert("Please enter a movie title.");
    return;
  }

  movies.push({
    title,
    genre,
    watched: false
  });

  movieTitle.value = "";
  renderMovies();
}

function toggleWatched(index) {
  movies[index].watched = !movies[index].watched;
  renderMovies();
}

function deleteMovie(index) {
  movies.splice(index, 1);
  renderMovies();
}

addMovieBtn.addEventListener("click", addMovie);
