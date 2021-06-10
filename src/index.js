import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {useState, useEffect} from "react";

import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

function App() {
  return (
    <div className="app">
      <MovieSearch />
    </div>
  );
}

function MovieSearch() {
  const [searchQuery, setSearchQuery] = useState(''); // user search bar input
  const [searchParameter, setSearchParameter] = useState(''); // search query formatted

  // called after user clicks search button to submit search query
  function search(e) {
    e.preventDefault();   // prevent page from refreshing
    setSearchQuery(""); // clear search bar

    var searchParam = encodeURIComponent(searchQuery);  // format search query data
    setSearchParameter(searchParam);
  }

  return (
    <div id="search">
      <h1>Movies</h1>
      <form onSubmit={search}>
        <input
          id="searchBar"
          type="text"
          placeholder="Search Movies"
          value = {searchQuery} // store search query
          onChange = {e => setSearchQuery(e.target.value)}  // set search bar value to display search query
        />
        <button className="searchBtn">Find Movie</button>
      </form>

      {/* display list of searched movies
        [condition] ? [result if true] : [result if false]*/
        searchParameter ? <MovieList movieTitle={searchParameter} searchState={searchParameter} /> : <></>
      }

    </div>
    );
}

// list of movies from search results
function MovieList({movieTitle, searchState}) {
  const [movies, setMovies] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // reset current page count to 1 if a new movie is searched
    if (currentPage !== 1)
      setCurrentPage(1);
  }, [searchState]);

    // search movies
    useEffect(()=> {
      console.log("getting search data for " + movieTitle + " page " + currentPage);

        fetch(`http://www.omdbapi.com/?s=${movieTitle}&apikey=52514a3a&page=${currentPage}`)
          .then(response => response.json())
          .then(response => setMovies(response))
          .catch(console.error);
    }, [searchState, currentPage]); // useEffect will run when search state or page changes due to user search input changes or page navigation

    // called when user clicks on button to go to different page
    function changePage(page) {
      if (page !== currentPage)
        setCurrentPage(page);
    }

    // display search results
    if (movies && movies.Response === "True") {
      console.log("displaying movies for " + movieTitle + " page " + currentPage);

      return (
           <div className="movieList">
              {/* display a card for every movie in search results list */
               movies.Search.map(movie => {
                  return <MovieCard name={movie.Title} year={movie.Year}/>
              })}

              { /* page navigation */
                [1,2,3].map((page) => (
                    <button onClick={() => {changePage(page)} }>{page}</button>
                  ))}
           </div>
         );
    }

  return (
    <div className="movieList">
      <h2>No results</h2>
    </div>
  );
}

// card showing details of a specific movie
function MovieCard({name, year}) {
  const [movieData, setMovieData] = useState(null);

  var releaseDate = "";
  var runtime = "";
  var genre = "";
  var director = "";

  const [detailsShown, setDetailsShown] = useState(false);  // whether or not details are currently displayed

  // clear data of movie on same card from previos page / search
  useEffect(() => {
     // releaseDate = "";
     // runtime = "";
     // genre = "";
     // director = "";
    setDetailsShown(false);
  }, [name, year]);

  // find details of movie
  async function getDetails() {
    // will only get data if data isn't already displayed
    if (!detailsShown) {
      console.log("getting movie data");
      fetch(`http://www.omdbapi.com/?t=${name}&y=${year}&apikey=52514a3a`)
        .then(response => response.json())
        .then(setMovieData)
        .catch(console.error);
      setDetailsShown(true);
    }
  }

  // set movie data variables to results retrieved
  if (movieData && movieData.Response === "True") {
    releaseDate = `${movieData.Released}`;
    runtime = `${movieData.Runtime}`;
    genre = `${movieData.Genre}`;
    if (movieData.Director !== null && movieData.Director !== "N/A")
      director = `${movieData.Director}`;
    else {
      director = "Unknown director";
    }
  }

  return (
    <div >
      <Card  style={{backgroundColor: 'transparent', margin: "20px", borderRadius: "20px"}}>
        <CardActionArea onClick ={() => {
          console.log("clicked on movie to see details");
          console.log("detailsShown: " + detailsShown);
          getDetails();
        }}>
          <Grid container
            className="cardGridContainer"
            direction = "column"
            justify = "center"
            spacing = {2} >

          {/*movie title*/}
            <Grid item style={{paddingTop: "25px", marginBottom: "20px"}} className="movieTitle">{name} {year}</Grid>

          {/* horizontal row of movie details */}
            <Grid container
              className = "cardDetailsContainer"
              direction='row'
              justify = "center"
              spacing = {7}>
              <Grid item>{releaseDate}</Grid>
              <Grid item>{runtime}</Grid>
              <Grid item>{genre}</Grid>
              <Grid item>{director}</Grid>
            </Grid>

          </Grid>
        </CardActionArea>
      </Card>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
