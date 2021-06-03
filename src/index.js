import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


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
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
