import { useEffect, useState } from "react";
import Logo from "./components/Logo";
import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";

import Box from "./components/Box";
import MoviesList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Summary from "./components/Summary";

import ErrorMsg from "./components/ErrorMsg";
import Loading from "./components/Loading";
import { API_KEY, useLocalStorageState } from "./helper";

// Components
// Navbar Component
function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

// Container
function Main({ children }) {
  return <main className="main">{children}</main>;
}

// App Function
function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watch");
  const controllerSearch = new AbortController(); // To Abort The Previous Requests If Exist
  // For Making API Call To Search About Movies
  async function searchMovies() {
    try {
      setIsLoading(true); // Show Loading Message
      setError(""); // If There Is A Previous Error Remove It
      const req = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
        { signal: controllerSearch.signal }
      );
      if (!req.ok) {
        throw new Error("something went wrong"); // If There Is An Error Terminate
      }
      const data = await req.json();
      if (data.Response == "False") {
        setMovies([]); // If There Is No Result Set Movies To Empty
        setIsLoading(false); // Hide Loading Message
        throw new Error("No Result.");
      } else {
        setMovies(data.Search);
      }
      setIsLoading(false); // Hide Loading Message
    } catch (err) {
      // Avoid Aborting Call Errors
      if (err.name !== "AbortError") {
        console.log(err.message);
        setError(err.message);
      }
    }
  }

  // Showing Details For Clicked Movie
  function handelClickMovie(id) {
    setSelectedId((currenId) => (currenId == id ? null : id));
  }

  // Close The Deatils Tab
  function handelCloseDetails() {
    setSelectedId(null);
  }

  // Handeling Remove Movie From Watched List
  function handelRemoveMovie(movieIndex) {
    setWatched((watchedMovies) => {
      return watchedMovies.filter((movie, index) => index != movieIndex);
    });
  }

  // Handeling Add Movie To Watched List
  function handelAddMovie(movie) {
    setWatched((watchedMovies) => {
      const movieIdIndex = watchedMovies.findIndex(
        (watchedMovie) => watchedMovie.imdbID == movie.imdbID
      );
      if (movieIdIndex == -1) {
        return [...watchedMovies, movie];
      }
      return watchedMovies.map((watchedMovie) => {
        if (watchedMovie.imdbID == movie.imdbID) {
          const newRated = {
            ...watchedMovie,
            userRating: movie.userRating,
          };
          return newRated;
        }
        return watchedMovie;
      });
    });
  }
  // Making API Requests
  useEffect(() => {
    if (query.length) {
      searchMovies();
    } else {
      setMovies([]);
    }
    return () => {
      controllerSearch.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <SearchInput onChangeQuery={setQuery} onReset={setError} />
        <SearchResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {error ? ( // If There An Error, Make It Able To Reload The Search
            <ErrorMsg msg={error} onReload={searchMovies} onReset={setError} />
          ) : isLoading ? (
            <Loading />
          ) : (
            <MoviesList
              movies={movies}
              type={"unwatched"}
              onSelectMovie={handelClickMovie}
            />
          )}
        </Box>
        <Box movies={watched}>
          {selectedId ? (
            <MovieDetails
              key={selectedId}
              movieId={selectedId}
              onClose={handelCloseDetails}
              onAddMovie={handelAddMovie}
              onRemoveMovie={handelRemoveMovie}
              watched={watched}
            />
          ) : (
            <>
              <Summary movies={watched} />
              <MoviesList
                movies={watched}
                type={"watched"}
                onSelectMovie={handelClickMovie}
                onDelete={handelRemoveMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export default App;

