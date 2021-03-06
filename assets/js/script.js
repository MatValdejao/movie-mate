const apiKey = "1c2cc299";
const apiKey2 = "6EW8DVJ9Y5sGBFMGXfuttZxSHuABvD5A";
var mainContentEl = document.querySelector(".main-content");
var submitButtonEl = document.getElementById("submit-btn");
var movieListEl = document.querySelector(".movie-list");
var movieTitle = document.querySelector(".movie-title");
var searchHistory = [];

var retrieveData = function (movie) {
	var apiURL = "https://www.omdbapi.com/?apikey=" + apiKey + "&t=" + movie;

	fetch(apiURL)
		.then(function (res) {
			if (res.ok) {
				res.json().then(function (data) {
					if (data.Response === "True") {
						movieReview(data, movie);
					} else {	
						createModal();
					}
				});
			}
		})
		.catch(function (error) {
			console.log("Unable to connect to Movies API");
			s;
		});
};

var movieReview = function (data2, movie) {
	var apiURL =
		"https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=" +
		apiKey2 +
		"&query=" +
		movie;

	fetch(apiURL)
		.then(function (res) {
			if (res.ok) {
				res.json().then(function (data) {
					displayMovie(data2, movie, data);
				});
			}
		})
		.catch(function (error) {
			console.log("Unable to connect to Movies API");
		});
};

var getMovie = function (event) {
	// gets button element
	var inputEl = document.querySelector(".validate");

	// retrieves button element text data
	var movie = inputEl.value.trim();
	movie = movie.toUpperCase();

	// calls retrieveData function
	retrieveData(movie);

	// clear input field
	inputEl.value = "";

	document.getElementById("pastSearches").style.visibility = "visible";
	document.getElementById("clear-button-section").style.visibility = "visible";
};

var displayMovie = function (data2, movie, data) {
	saveMovie(movie);
	$(".carousel-val").remove();

	mainContentEl.style.display = "block";

	var reviewData = data;

	// get movie data
	var movieData = data2;

	// calls carousel builder functions
	// scale the headers of the cards down
	// enlarge the content font slightly to fill the card
	carouselItemOne(movieData, movie);
	carouselItemTwo(movieData, movie);
	carouselItemThree(reviewData, movie);
	carouselItemFour(movieData, movie);
};

var carouselItemOne = function (movieData, movie) {
	// select first carousel item
	var carouselOneEl = document.querySelector(".item1");

	// display movie title as first carousel item
	// move display to the header of the section
	// add age rating in its place maybe?
	var movieTitleEl = document.createElement("h3");
	movieTitleEl.classList = "carousel-val";
	movieTitleEl.style.color = "black";
	movieTitleEl.style.textAlign = "center";
	movieTitleEl.textContent = movieData.Title;

	// date movie released, together with movie title carousel
	var releaseDateEl = document.createElement("h3");
	releaseDateEl.classList = "carousel-val";
	releaseDateEl.style.color = "black";
	releaseDateEl.style.marginBottom = "10vh";
	releaseDateEl.style.textAlign = "center";
	var releaseDateSplit = movieData.Released.split(" ");
	var releaseYear = releaseDateSplit[2];
	releaseDateEl.textContent = "Release Date: " + releaseYear;

	// get the rated data for the movie
	var ratedEl = document.createElement("h4");
	ratedEl.classList = "carousel-val";
	ratedEl.style.color = "black";
	ratedEl.style.textAlign = "center";
	var rated = movieData.Rated;
	ratedEl.textContent = "Rated: " + rated;

	// append to page
	movieTitle.appendChild(movieTitleEl);
	carouselOneEl.appendChild(releaseDateEl);
	carouselOneEl.appendChild(ratedEl);
};

var carouselItemTwo = function (movieData, movie) {
	// get carousel element two
	var carouselTwoEl = document.querySelector(".item2");

	// plot element carousel item
	// remove "Plot" title header
	var plotTitleEl = document.createElement("h3");
	plotTitleEl.style.color = "black";
	plotTitleEl.style.marginBottom = "5vh";
	plotTitleEl.classList = "carousel-val";
	plotTitleEl.style.textAlign = "center";
	plotTitleEl.textContent = "Plot";

	// plot description
	var plotEl = document.createElement("p");
	plotEl.style.color = "black";
	plotEl.style.fontSize = "1.6rem";
	plotEl.classList = "carousel-val";
	plotEl.style.textAlign = "center";
	// checks whether plot description exists
	if (movieData.Plot === "N/A") {
		plotEl.textContent = "Sorry! No Plot Provided!";
	} else {
		plotEl.textContent = movieData.Plot;
	}

	// append to page
	carouselTwoEl.appendChild(plotTitleEl);
	carouselTwoEl.appendChild(plotEl);
};

var carouselItemThree = function (reviewData, movie) {
	// get carousel element three
	var carouselThreeEl = document.querySelector(".item3");

	// reviews section carousel item
	var reviewEl = document.createElement("h3");
	reviewEl.style.color = "black";
	reviewEl.style.marginBottom = "5vh";
	reviewEl.classList = "carousel-val";
	reviewEl.style.textAlign = "center";
	reviewEl.textContent = "Reviews";

	var movieReviewEl = document.createElement("p");
	movieReviewEl.style.color = "black";
	movieReviewEl.style.fontSize = "2rem";
	movieReviewEl.classList = "carousel-val";
	movieReviewEl.style.textAlign = "center";
	if (reviewData.results === null) {
		movieReviewEl.textContent = "No review available for " + movie;
	} else {
		console.log(reviewData);
		movieReviewEl.innerHTML =
			"<a href=" +
			reviewData.results[0].link.url +
			" target=_blank> New York Times Review To " +
			movie +
			"</a>";
	}
	movieReviewEl.style.textDecoration = "none";

	// append to page
	carouselThreeEl.appendChild(reviewEl);
	carouselThreeEl.appendChild(movieReviewEl);
};

var carouselItemFour = function (movieData, movie) {
	// gets carousel element four
	var carouselFourEl = document.querySelector(".item4");

	// cast and awards carousel item
	var castEl = document.createElement("h3");
	castEl.style.color = "black";
	castEl.classList = "carousel-val";
	castEl.style.textAlign = "center";
	castEl.textContent = "Notable Cast";

	// create list to append each cast person into
	var actorListEl = document.createElement("ul");
	var actorsList = movieData.Actors.split(",");
	actorListEl.classList = "carousel-val";

	// append actors into cast list
	for (var i = 0; i < actorsList.length; i++) {
		var listItemEl = document.createElement("li");
		listItemEl.textContent = actorsList[i];
		listItemEl.style.color = "black";
		listItemEl.style.fontSize = "1.4rem";
		actorListEl.appendChild(listItemEl);
	}

	// append to page
	carouselFourEl.appendChild(castEl);
	carouselFourEl.appendChild(actorListEl);

	// checks whether searched movie earned awards, if so, display awards on screen
	if (movieData.Awards !== "N/A") {
		var awardsEl = document.createElement("h3");
		awardsEl.style.color = "black";
		awardsEl.style.padding = "0px";
		awardsEl.classList = "carousel-val";
		awardsEl.style.textAlign = "center";
		awardsEl.textContent = "Awards";

		// create list to append each cast person into
		var awardListEl = document.createElement("ul");
		awardListEl.classList = "carousel-val";
		var awardList = movieData.Awards.split(",");

		// append awards to list
		for (var i = 0; i < awardList.length; i++) {
			var listItemEl = document.createElement("li");
			listItemEl.textContent = awardList[i];
			listItemEl.style.color = "black";
			listItemEl.style.fontSize = "1.4rem";
			awardListEl.appendChild(listItemEl);
		}
		// append to page when exists
		carouselFourEl.appendChild(awardsEl);
		carouselFourEl.appendChild(awardListEl);
	}
};

document.addEventListener("DOMContentLoaded", function () {
	var elems = document.querySelectorAll(".carousel");
	var instances = M.Carousel.init(elems);
	mainContentEl.style.display = "none";
});

var historyButtons = function (movie) {
	// create history button for specific movie
	var histButtonEl = document.createElement("button");
	histButtonEl.setAttribute("type", "submit");
	histButtonEl.classList = "history-btn";
	movie = movie.toUpperCase();
	histButtonEl.textContent = movie;

	movieListEl.appendChild(histButtonEl);
};

var saveMovie = function (movie) {
	if (searchHistory.indexOf(movie) === -1) {
		movie = movie.toUpperCase();
		searchHistory.push(movie);

		// save movie to page
		historyButtons(movie);
	}
	localStorage.setItem("movie", searchHistory);
};

var savedStorage = function () {
	searchHistory = localStorage.getItem("movie");

	// check whether searchHistory exists
	if (searchHistory === null) {
		searchHistory = [];
		return;
	}

	searchHistory = searchHistory.split(",");
	for (var i = 0; i < searchHistory.length; i++) {
		historyButtons(searchHistory[i]);
	}
};

// add "Enter" key as possible input
var input = document.getElementById("search");
input.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		event.preventDefault();
		getMovie();
	}
});

var createModal = function () {
	$(".modal").modal();
	$(".modal").modal("open")
};

// upon historical button click, retrieve that movie's data
$(".movie-list").on("click", ".history-btn", function (event) {
	var movie = event.target.textContent;

	retrieveData(movie);
});

$(".clr-btn").on("click", function (event) {
	localStorage.clear();
	$(".history-btn").remove();
	searchHistory = [];
	savedStorage();
});

$(".material-icons").on("click", function (event) {
	document.getElementById("page-top").scrollIntoView();
});

savedStorage();

submitButtonEl.addEventListener("click", getMovie);
