import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useNavigate } from "react-router-dom";
import placeholderPoster from "../assets/placeholder.png";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Movie = () => {
  const navigate = useNavigate();
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=9c8a3160&i=${imdbID}`,
      );
      setMovie(response.data);
    }

    fetchMovie();
  }, [imdbID]);

  if (!movie) {
    return (
      <div className="movie-page movie-page--loading">
        <FontAwesomeIcon icon="spinner" />
      </div>
    );
  }

  return (
    <div className="movie-page">
      <div className="movie-page__container">
        <div className="movie-page__back-icon" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon="arrow-left" />
          Back
        </div>
        <h2 className="movie-page__title">{movie.Title}</h2>
      </div>
      <div className="movie-page__container">
        <img
          className="movie-page__poster"
          src={movie.Poster}
          onError={(event) => {
            event.target.onerror = null;
            event.target.src = placeholderPoster;
          }}
          alt={`${movie.Title} poster`}
        />
        <div className="movie-page__details">
          <h2 className="movie-page__released">{movie.Released}</h2>
          <h3 className="movie-page__genre">{movie.Genre}</h3>
          <p className="movie-page__plot">{movie.Plot}</p>
          <div className="movie-page__rating">IMDB: {movie.imdbRating}</div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
