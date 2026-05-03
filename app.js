const addMovieBtn = document.getElementById("addMovieBtn");
const movieTitle = document.getElementById("movieTitle");
const movieGenre = document.getElementById("movieGenre");
const movieYear = document.getElementById("movieYear");
const moviePoster = document.getElementById("moviePoster");
const movieRating = document.getElementById("movieRating");
const movieList = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const ratingSort = document.getElementById("ratingSort");

let movies = JSON.parse(localStorage.getItem("movies")) || [];
let editIndex = null;

function saveMovies() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

function renderMovies() {
  movieList.innerHTML = "";

  const searchText = searchInput.value.toLowerCase();
  const selectedStatus = statusFilter.value;

  let filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchText);

    let matchesStatus = true;
    if (selectedStatus === "watched") {
      matchesStatus = movie.watched === true;
    } else if (selectedStatus === "unwatched") {
      matchesStatus = movie.watched === false;
    }

    return matchesSearch && matchesStatus;
  });

  if (ratingSort.value === "high") {
    filteredMovies.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
  } else if (ratingSort.value === "low") {
    filteredMovies.sort((a, b) => (Number(a.rating) || 0) - (Number(b.rating) || 0));
  }

  filteredMovies.forEach((movie) => {
    const originalIndex = movies.indexOf(movie);

    const li = document.createElement("li");
    li.className = "movie-item";

    li.innerHTML = `
      <div class="movie-info">
        ${movie.poster ? `<img src="${movie.poster}" alt="${movie.title} poster" class="poster" />` : ""}
        <span class="${movie.watched ? "watched" : ""}">
          <strong>${movie.title}</strong>
        </span>
        <small>${movie.genre} ${movie.year ? `(${movie.year})` : ""}</small>
        <small>Rating: ${movie.rating ? "⭐".repeat(movie.rating) : "Not rated"}</small>
      </div>
      <div class="actions">
        <button onclick="toggleWatched(${originalIndex})">
          ${movie.watched ? "Unwatch" : "Watched"}
        </button>
        <button onclick="editMovie(${originalIndex})">Edit</button>
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
  const poster = moviePoster.value.trim();
  const rating = movieRating.value;

  if (title === "") {
    alert("Please enter a movie title.");
    return;
  }

  if (editIndex === null) {
    movies.push({
      title,
      genre,
      year,
      poster,
      rating,
      watched: false,
      description: ""
    });
  } else {
    movies[editIndex].title = title;
    movies[editIndex].genre = genre;
    movies[editIndex].year = year;
    movies[editIndex].poster = poster;
    movies[editIndex].rating = rating;

    editIndex = null;
    addMovieBtn.textContent = "Add Movie";
  }

  saveMovies();
  movieTitle.value = "";
  movieYear.value = "";
  moviePoster.value = "";
  movieRating.value = "";
  renderMovies();
}

function editMovie(index) {
  movieTitle.value = movies[index].title;
  movieGenre.value = movies[index].genre;
  movieYear.value = movies[index].year || "";
  moviePoster.value = movies[index].poster || "";
  movieRating.value = movies[index].rating || "";

  editIndex = index;
  addMovieBtn.textContent = "Update Movie";
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
ratingSort.addEventListener("change", renderMovies);

renderMovies();