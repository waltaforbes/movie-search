const apiKey = "fd81c84f"; // Your actual OMDb API key

function searchMovie() {
  const query = document.getElementById("searchInput").value;
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (!query.trim()) {
    alert("Please enter a movie name");
    return;
  }

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        data.Search.forEach(movie => {
          const card = document.createElement("div");
          card.className = "movie-card";
          card.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}" alt="${movie.Title}" />
            <div class="movie-title">${movie.Title} (${movie.Year})</div>
          `;
          resultsContainer.appendChild(card);
        });
      } else {
        resultsContainer.innerHTML = `<p>No results found.</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching movie data:", error);
      resultsContainer.innerHTML = `<p>Error fetching data. Try again later.</p>`;
    });
}
