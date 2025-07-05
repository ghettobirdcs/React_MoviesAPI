import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  fas,
  faMagnifyingGlass,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";

library.add(fas, faMagnifyingGlass, faBars, faXmark);

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Movies />} />
          <Route path="/:imdbID" element={<Movie />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
