import React, { useState, useEffect } from 'react';
import './Search.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Load from '../animations/loading/Load';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const searchCategories = ['people', 'planets', 'starships'];

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setNotFound(false);
      setError(null);

      try {
        const responses = await Promise.all(
          searchCategories.map((category) =>
            axios.get(`https://swapi.tech/api/${category}/?search=${searchTerm}`)
          )
        );
        const suggestedItems = responses
          .map((response) => response.data.results)
          .flat()
          .map((item) => ({ name: item.name, category: item.url.split('/')[4] }));
        setSuggestions(suggestedItems);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setNotFound(true);
        setError(err.message);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = () => {
    setRedirect(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRedirect(true);
  };

  return (
    <div className="search-container">
      {loading && <Load />}
      {notFound && <h1 className="center">Not found</h1>}
      {error && <h1 className="center">Error: {error}</h1>}

      <div className="form">
        <h1>Search the Star Wars universe</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={`Type a character, planet, or starship name`}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="suggestion">
        {suggestions.length > 0 && <h1>Search results</h1>}
        {suggestions.map((item, index) => (
          <NavLink
            to={`/${item.category}/${item.name}`}
            key={index}
            className="item"
            onClick={handleSuggestionClick}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Search;