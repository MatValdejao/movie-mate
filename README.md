# Movie Mate

## Summary

Often times, when discussing movies with friends, we forget many details such as actor names. Other times, we are thinking about watching a movie but want to better undstand what they are about and the reviews about the movie. Movie Mate is movie search application that allows users to input a movie title and get brief information about the plot, cast, awards won, and reviews. The app stores previous searches in local storage. 

## User Story

* AS A human
* I WANT to be able to find facts and ratings for movies
* SO THAT I can connect with conversations around me
* GIVEN I haven't seen a movie that is being talked about
* WHEN I am trying to make connections with other humans
* THEN I expect a short plot and review returned to me in order to include myself in the conversation

## Overview

This is a front-end application only. The application utilizes JavaScript to handle button click events as well as caroussel functionality. Once the user inputs a movie and clicks the "search" button, JavaScript captures the event and movie name and fecthes data via API calls about the searched movie. The data is returned and dynamically created on the website into the caroussel boxes, with each box depicting a different piece of information, for example, one box talks about actors in the movie while another other provides a link to a NY Times review of the movie. The movie title is saved under local storage and displayed for reference. The user can click the saved name of previous mocies to search them again and can also, if they want, clear their search history. 

## Instructions

To open the app click the link in the Deployed Application section. 

## Technologies Used

Movie Mate was built using:
* HTML
* Materialize CSS Library
* JavaScript
* APIs: [OMDB API](https://www.omdbapi.com/) and [NYTimes API](https://developer.nytimes.com/apis)

## Initial Mock Up

![screenshot of mock up](https://user-images.githubusercontent.com/106041115/179863653-7b051d38-11c7-473b-835b-2541d528bac3.png)

## Deployed Application

The deployed application can be found at: https://matvaldejao.github.io/movie-mate/

![screenshot of deployed application](./assets/images/final-screenshot.png)

## Contributors

* Mateus Valdejao - [GitHub Profile](https://github.com/MatValdejao)
* Hannah Bird - [GitHub Profile](https://github.com/Hannahbird)
* Anita Jose - [GitHub Profile](https://github.com/anitajose1)
* Duchney Derosier - [GitHub Profile](https://github.com/d2-dro)
* Lucas Blackwell - [GitHub Profile](https://github.com/Blackwell101)
* Alex Durham - [GitHub Profile](https://github.com/Alex-Durham)

## Acknowledgements

The following resources served as useful references during development:
* https://codeburst.io/know-your-http-status-a-cheat-sheet-for-http-status-codes-5fb43863e589
* https://www.geeksforgeeks.org/scroll-to-the-top-of-the-page-using-javascript-jquery/
