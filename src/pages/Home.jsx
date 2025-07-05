import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import blinkerLogo from "../assets/blinker-icon.png";
import building from "../assets/building.png";

const Home = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function searchMovies() {
    setLoading(true);
    navigate("/search");

    // Setting value of the search term to whatever the user typed in the searchbar on the homepage
    localStorage.setItem("id", searchTerm);
  }

  return (
    <div>
      <header>
        <nav className="nav__container">
          <div className="nav__logo--wrapper">
            <img className="nav__logo" src={blinkerLogo} alt="blinker logo" />
          </div>

          <ul className="nav__links">
            <li>
              <Link
                to="#"
                className="nav__link link__hover-effect link__hover-effect--purple"
              >
                <span className="purple">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="nav__link link__hover-effect link__hover-effect--black"
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

          <div id="phone-nav" className={modalOpen ? "open" : "closed"}>
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
              <Link to="/search" className="phone-nav__link">
                <span className="purple">Find Your Movie</span>
              </Link>
              <Link
                to="/"
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
      </header>

      <section id="landing">
        <div className="container">
          <h1 className="landing__title">
            <span className="purple">
              America's most awarded movie cataloguing platform
            </span>
          </h1>
          <h2 className="landing__sub-title">
            FIND YOUR PREFERRED MOVIE WITH{" "}
            <span className="purple">BLINKER</span>
          </h2>
          <div className="input-wrapper">
            <input
              className="searchbar"
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchMovies()}
            />
            <button
              className={
                !loading ? "search-btn not-loading" : "search-btn loading"
              }
              onClick={searchMovies}
            >
              {loading ? (
                <FontAwesomeIcon
                  icon="spinner"
                  className="fa-spinner--homepage"
                />
              ) : (
                <FontAwesomeIcon icon="magnifying-glass" />
              )}
            </button>
          </div>
        </div>
        <div className="img__wrapper">
          <img src={building} alt="splash" className="landing__img" />
        </div>
      </section>
    </div>
  );
};

export default Home;
