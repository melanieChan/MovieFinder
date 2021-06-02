import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function SearchBar() {
  return (
    <div id="search">
      <h1>Movies</h1>
      <input id="searchBar" type="text" placeholder="Search Movies"/>
    </div>
    );
}

ReactDOM.render(
  <SearchBar />,
  document.getElementById('root')
);
