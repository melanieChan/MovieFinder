import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

function App() {
  return (
    <div className="app">
      <SearchBar />
      <MovieList />
    </div>
  );
}

function SearchBar() {
  return (
    <div id="search">
      <h1>Movies</h1>
      <input
        id="searchBar"
        type="text"
        placeholder="Search Movies"
      />
      <button className="searchBtn">Find Movies</button>
    </div>
    );
}

function MovieList() {
  return (
    <div className="movieList">
      <MovieCard name="Movie"releaseDate="6/2/21" runtime="1 hr" genre="family" director="director"/>
      <MovieCard name="Movie" releaseDate="6/2/21" runtime="1 hr" genre="family" director="director"/>
    </div>
  );
}

function MovieCard({name, releaseDate, runtime, genre, director}) {
  return (
    <div >
      <Card  style={{backgroundColor: 'transparent', margin: "20px", borderRadius: "20px"}}>
        <CardActionArea >
          <Grid container
            className="cardGridContainer"
            direction = "column"
            justify = "center"
            spacing = {2} >

          {/*movie title*/}
            <Grid item style={{paddingTop: "25px", marginBottom: "20px"}} className="movieTitle">{name}</Grid>

          {/* horizontal row of movie details */}
            <Grid container
              direction='row'
              justify = "center"
              spacing = {10}>
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
