const addMovieBtn = document.getElementById("addMovieBtn");
const movieTitle = document.getElementById("movieTitle");
const movieGenre = document.getElementById("movieGenre");
const movieYear = document.getElementById("movieYear");
const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

let movies = JSON.parse(localStorage.getItem("movies")) || [];

function saveMovies() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

function renderMovies() {
  movieList.innerHTML = "";

  const searchText = searchInput.value.toLowerCase();
  const selectedStatus = statusFilter.value;

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchText);

    let matchesStatus = true;
    if (selectedStatus === "watched") {
      matchesStatus = movie.watched === true;
    } else if (selectedStatus === "unwatched") {
      matchesStatus = movie.watched === false;
    }

    return matchesSearch && matchesStatus;
  });

  filteredMovies.forEach((movie) => {
    const originalIndex = movies.indexOf(movie);

    const li = document.createElement("li");
    li.className = "movie-item";

    li.innerHTML = `
      <div class="movie-info">
        <span class="${movie.watched ? "watched" : ""}">
          <strong>${movie.title}</strong>
        </span>
        <small>${movie.genre} ${movie.year ? `(${movie.year})` : ""}</small>
      </div>
      <div class="actions">
        <button onclick="toggleWatched(${originalIndex})">
          ${movie.watched ? "Unwatch" : "Watched"}
        </button>
        <button onclick="deleteMovie(${originalIndex})">Delete</button>
        <button onclick="viewDetails(${originalIndex})">Details</button>
      </div>
    `;

    movieList.appendChild(li);
  });
}

function addMovie() {
  const title = movieTitle.value.trim();
  const genre = movieGenre.value;
  const year = movieYear.value.trim();

  if (title === "") {
    alert("Please enter a movie title.");
    return;
  }

  movies.push({
    title,
    genre,
    year,
    watched: false
  });

  saveMovies();
  movieTitle.value = "";
  movieYear.value = "";
  renderMovies();
}

function toggleWatched(index) {
  movies[index].watched = !movies[index].watched;
  saveMovies();
  renderMovies();
}

function deleteMovie(index) {
  movies.splice(index, 1);
  saveMovies();
  renderMovies();
}

function viewDetails(index) {
  localStorage.setItem("selectedMovie", JSON.stringify(movies[index]));
  localStorage.setItem("selectedMovieIndex", index);
  window.location.href = "details.html";
}

addMovieBtn.addEventListener("click", addMovie);
searchInput.addEventListener("input", renderMovies);
statusFilter.addEventListener("change", renderMovies);

renderMovies();