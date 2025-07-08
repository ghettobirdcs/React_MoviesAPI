import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import placeholderPoster from "../assets/placeholder.png";
import React, { useEffect, useState, useMemo } from "react";
import carparkImage from "../assets/carpark.jpeg";
import whitelogo from "../assets/whitelogo.png";
import { Link } from "react-router-dom";
import axios from "axios";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("RELEVANT");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const filteredMovies = useMemo(() => {
    let sorted = [...movies];
    if (filter === "ALPHABETICAL") {
      sorted.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (filter === "NEW_TO_OLD") {
      sorted.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    } else if (filter === "OLD_TO_NEW") {
      sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    }

    return sorted;
  }, [movies, filter]);

  function renderMovies(movies) {
    if (movies.length === 0 && searchTerm !== "") {
      return <div className="no-results">No results found</div>;
    } else if (movies.length === 0 && searchTerm === "") {
      return (
        <div className="start-searching">Find your next favorite movie!</div>
      );
    }

    return movies.map((movie) => (
      <div className="movie__container" key={movie.imdbID}>
        <div className="movie__poster--wrapper">
          <Link to={`/${movie.imdbID}`} key={movie.imdbID}>
            <img
              className="movie__poster"
              src={movie.Poster}
              alt={`${movie.Title} poster`}
              onError={(event) => {
                event.target.onerror = null; // Prevents infinite loop if image fails to load
                event.target.src = placeholderPoster; // Fallback image
              }}
            />
          </Link>
        </div>
        <div className="movie__title">{movie.Title}</div>
        <div className="movie__date">{movie.Year}</div>
      </div>
    ));
  }

  // On mount, get search term from localStorage if it exists
  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("id") || "";
    setSearchTerm(storedSearchTerm);
  }, []);

  // Whenever searchTerm changes and isn't empty, fetch movies
  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      axios
        .get(`https://www.omdbapi.com/?apikey=9c8a3160&s=${searchTerm}`)
        .then((response) => {
          setMovies(response.data.Search || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
      localStorage.setItem("id", searchTerm);
    } else {
      setLoading(false);
      setMovies([]);
    }
  }, [searchTerm]);

  return (
    <>
      <header className="searchpage__header">
        <nav className="nav__container">
          <div className="nav__logo--wrapper">
            <img className="nav__logo" src={whitelogo} alt="blinker logo" />
          </div>

          <ul className="nav__links">
            <li>
              <Link
                to="/"
                className="nav__link link__hover-effect link__hover-effect--white"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="nav__link link__hover-effect link__hover-effect--white"
              >
                Find movies
              </Link>
            </li>
            <li>
              <Link to="#" className="nav__link nav__link--primary">
                CONTACT
              </Link>
            </li>
          </ul>

          <div
            id="phone-nav"
            className={`phone-nav--searchpage ${modalOpen ? "open" : "closed"}`}
          >
            <div className="phone-nav__open" onClick={() => setModalOpen(true)}>
              <FontAwesomeIcon icon="bars" />
            </div>
            <div className="phone-nav__menu">
              <Link
                to="/"
                className="phone-nav__link"
                onClick={() => setModalOpen(false)}
              >
                <span className="purple">Home</span>
              </Link>
              <Link
                to="/search"
                className="phone-nav__link"
                onClick={() => setModalOpen(false)}
              >
                <span className="purple">Find Your Movie</span>
              </Link>
              <Link
                to="#"
                className="phone-nav__link"
                onClick={() => setModalOpen(false)}
              >
                <span className="purple">Contact</span>
              </Link>
            </div>
            <div
              className="phone-nav__close"
              onClick={() => setModalOpen(false)}
            >
              <FontAwesomeIcon icon="xmark" />
            </div>
          </div>
        </nav>

        <div className="search__container">
          <h1 className="search__title">Browse our movies</h1>
          <div className="input-wrapper">
            <input
              type="text"
              className="searchbar searchbar--searchpage"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  setSearchTerm(event.target.value);
                }
              }}
              value={searchTerm}
              placeholder={"Search for a movie..."}
            />
            <div className="search-btn--searchpage">
              <FontAwesomeIcon icon="magnifying-glass" />
            </div>
          </div>
        </div>
        <div
          className="overlay"
          style={{
            backgroundImage: `url(${carparkImage})`,
          }}
        ></div>
      </header>

      <section id="results">
        <div className="results__container">
          <h2 className="results__text">Search results:</h2>
          <select
            id="filter"
            onChange={(event) => setFilter(event.target.value)}
          >
            <option value="RELEVANT" defaultValue={true}>
              Relevant
            </option>
            <option value="ALPHABETICAL">Alphabetical</option>
            <option value="NEW_TO_OLD">Newest</option>
            <option value="OLD_TO_NEW">Oldest</option>
          </select>
        </div>
        <div className="movies">
          {!loading ? (
            renderMovies(filteredMovies)
          ) : (
            <FontAwesomeIcon
              icon="spinner"
              className="movies__loading--spinner"
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Movies;
