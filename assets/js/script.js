const apiKey = "1c2cc299";
var mainContentEl = document.querySelector(".main-content");
var submitButtonEl = document.getElementById("submit-btn");

var retrieveData = function (movie) {
	var apiURL = "http://www.omdbapi.com/?apikey=" + apiKey + "&t=" + movie;

	fetch(apiURL).then(function (res) {
		if (res.ok) {
            res.json().then(function (data) {
                if (data.Response === "True") {
                    displayMovie(data, movie);
                } 
                else {
                    alert(data.Error)
                }
			});
        }
    }).catch(function (error) {
        alert("Unable to connect to Movies API")
    });
};

var getMovie = function (event) {
	// gets button element
	var inputEl = document.querySelector(".validate");

	// retrieves button element text data
	var movie = inputEl.value.trim();

	// calls retrieveData function
	retrieveData(movie);
};

var displayMovie = function (data, movie) {
	// get movie data
    var movieData = data;
    
    // calls carousel builder functions
    carouselItemOne(movieData, movie);
    carouselItemTwo(movieData, movie);
    carouselItemThree(movieData, movie);
    carouselItemFour(movieData, movie);
};

var carouselItemOne = function (movieData, movie) {
    // select first carousel item
	var carouselOneEl = document.querySelector(".item1");

	// display movie title as first carousel item
	var movieTitleEl = document.createElement("h3");
	movieTitleEl.style.color = "black";
	movieTitleEl.style.textAlign = "center";
	movieTitleEl.textContent = movie;

	// date movie released, together with movie title carousel
	var releaseDateEl = document.createElement("h3");
	releaseDateEl.style.color = "black";
	releaseDateEl.style.textAlign = "center";
	var releaseDateSplit = movieData.Released.split(" ");
	var releaseYear = releaseDateSplit[2];
    releaseDateEl.textContent = "(" + releaseYear + ")";
    
    // append to page
    carouselOneEl.appendChild(movieTitleEl);
	carouselOneEl.appendChild(releaseDateEl);
}

var carouselItemTwo = function (movieData, movie) {
    // get carousel element two
	var carouselTwoEl = document.querySelector(".item2");

	// plot element carousel item
	var plotTitleEl = document.createElement("h3");
	plotTitleEl.style.color = "black";
	plotTitleEl.style.textAlign = "center";
	plotTitleEl.textContent = "Plot";

	// plot description
	var plotEl = document.createElement("p");
	plotEl.style.color = "black";
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
}

var carouselItemThree = function (movieData, movie) {
    // get carousel element three
	var carouselThreeEl = document.querySelector(".item3");

	// reviews section carousel item
	var reviewEl = document.createElement("h3");
	reviewEl.style.color = "black";
	reviewEl.style.textAlign = "center";
	reviewEl.textContent = "Reviews";

	// takes review from other API

	// var movieTitleEl = document.createElement("p");
	// movieTitleEl.style.color = "black";
	// movieTitleEl.style.textAlign = "center";
	// movieTitleEl.textContent = ;

    // append to page
    carouselThreeEl.appendChild(reviewEl);
}

var carouselItemFour = function (movieData, movie) {
	// gets carousel element four
	var carouselFourEl = document.querySelector(".item4");

	// cast and awards carousel item
	var castEl = document.createElement("h3");
	castEl.style.color = "black";
	castEl.style.textAlign = "center";
	castEl.textContent = "Notable Cast";

	// create list to append each cast person into
	var actorListEl = document.createElement("ul");
	var actorsList = movieData.Actors.split(",");

	// append actors into cast list
	for (var i = 0; i < actorsList.length; i++) {
		var listItemEl = document.createElement("li");
		listItemEl.textContent = actorsList[i];
		listItemEl.style.color = "black";
		actorListEl.appendChild(listItemEl);
    }

    // append to page
    carouselFourEl.appendChild(castEl);
	carouselFourEl.appendChild(actorListEl);

	// checks whether searched movie earned awards, if so, display awards on screen
	if (movieData.Awards !== "N/A") {
		var awardsEl = document.createElement("h3");
		awardsEl.style.color = "black";
		awardsEl.style.textAlign = "center";
		awardsEl.textContent = "Awards";

		// create list to append each cast person into
		var awardListEl = document.createElement("ul");
		var awardList = movieData.Awards.split(",");

		// append awards to list
		for (var i = 0; i < awardList.length; i++) {
			var listItemEl = document.createElement("li");
			listItemEl.textContent = awardList[i];
			listItemEl.style.color = "black";
			awardListEl.appendChild(listItemEl);
		}
        // append to page when exists
		carouselFourEl.appendChild(awardsEl);
		carouselFourEl.appendChild(awardListEl);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	var elems = document.querySelectorAll(".carousel");
	var instances = M.Carousel.init(elems);
});

submitButtonEl.addEventListener("click", getMovie);
