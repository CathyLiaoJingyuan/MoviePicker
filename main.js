$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();

    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios
    .get("http://www.omdbapi.com/?apikey=e025990d&s=" + searchText)
    .then(response => {
      let movies = response.data.Search;
      let output = "";
      $("span.searchName").html(
        `<span class="text-warning">${searchText}</span>`
      );
      $.each(movies, (index, movie) => {
        output += `
                <div class="col-md-3">
                     <div class="well text-center">
                     <img src=${checkImageMain(movie)}>
                     <h5>${movie.Title}</h5>
                           <a href="#" onClick="movieSelected('${
                             movie.imdbID
                           }')" class="btn btn-warning"> More Details</a>
                    </div>
                </div>
                `;
      });
      $("#movies").html(output);
    })

    .catch(err => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");

  axios
    .get("http://www.omdbapi.com/?apikey=e025990d&i=" + movieId)
    .then(response => {
      let movie = response.data;
      let output = `
      <br>
 <div class="row">
          <div class="col-md-4">
            <img src="${checkImage(
              movie
            )}" class="thumbnail" style="width:100%; height:100%">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${
                movie.Genre
              }</li>
              <li class="list-group-item"><strong>Released:</strong> ${
                movie.Released
              }</li>
              <li class="list-group-item"><strong>Rated:</strong> ${
                movie.Rated
              }</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${
                movie.imdbRating
              }</li>
              <li class="list-group-item"><strong>Director:</strong> ${
                movie.Director
              }</li>
              <li class="list-group-item"><strong>Writer:</strong> ${
                movie.Writer
              }</li>
              <li class="list-group-item"><strong>Actors:</strong> ${
                movie.Actors
              }</li>
            </ul>
          </div>
        </div>
         <div class="row">
         <br>
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${
              movie.imdbID
            }" target="_blank" class="btn btn-warning">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;
      $("#movie").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

function checkImage(movie) {
  let posterLink = "";

  if (movie.Poster != "N/A") {
    posterLink = movie.Poster;
  } else {
    posterLink = "Image-not-found.gif";
  }
  return posterLink;
}

function checkImageMain(movie) {
  let posterLink = "";

  if (movie.Poster != "N/A") {
    posterLink = movie.Poster;
  } else {
    posterLink = "Image-not-found.gif";
  }
  return posterLink;
}
