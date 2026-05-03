const movieDetails = document.getElementById("movieDetails");
const descriptionInput = document.getElementById("movieDescription");

let movies = JSON.parse(localStorage.getItem("movies")) || [];
let selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
const selectedIndex = localStorage.getItem("selectedMovieIndex");

function displayMovieDetails() {
  if (selectedMovie) {
    movieDetails.innerHTML = `
      <div class="movie-item">
        <div class="movie-info">
          ${selectedMovie.poster ? `<img src="${selectedMovie.poster}" alt="${selectedMovie.title} poster" class="poster-large" />` : ""}
          <span><strong>${selectedMovie.title}</strong></span>
          <small>Genre: ${selectedMovie.genre}</small>
          <small>Year: ${selectedMovie.year || "Not provided"}</small>
          <small>Status: ${selectedMovie.watched ? "Watched" : "Unwatched"}</small>
          <small>Rating: ${selectedMovie.rating ? "⭐".repeat(selectedMovie.rating) : "Not rated"}</small>
          <small><strong>Description:</strong> ${selectedMovie.description || "No description added yet."}</small>
        </div>
      </div>
    `;

    descriptionInput.value = selectedMovie.description || "";
  } else {
    movieDetails.innerHTML = "<p>No movie selected.</p>";
  }
}

function saveDescription() {
  const newDescription = descriptionInput.value;

  if (selectedIndex !== null) {
    movies[selectedIndex].description = newDescription;

    localStorage.setItem("movies", JSON.stringify(movies));

    selectedMovie = movies[selectedIndex];
    localStorage.setItem("selectedMovie", JSON.stringify(selectedMovie));

    displayMovieDetails();
    alert("Description saved!");
  }
}

function goBack() {
  window.location.href = "index.html";
}

displayMovieDetails();