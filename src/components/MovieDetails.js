import Stars from "./Stars";
import { useState, useEffect } from "react";
import Loading from "./Loading";
import ErrorMsg from "./ErrorMsg";
import IconText from "./IconText";
import { API_KEY, useKeyPress } from "../helper";

// For Showing Details
function MovieDetails({
  movieId,
  onClose,
  watched,
  onAddMovie,
  onRemoveMovie,
}) {
  // To Know If The User Already Rated The Movie
  let movieIndex;
  let alreadyRated = watched.find((movie, index) => {
    if (movie.imdbID == movieId) {
      movieIndex = index;
      return movie;
    }
  })?.userRating;
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [userRating, setUserRating] = useState(
    alreadyRated - 1 >= 0 ? alreadyRated - 1 : -1
  );
  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const detailsController = new AbortController();

  function addMovie() {
    const watchedMovie = {
      imdbID: movieId,
      title,
      year,
      poster,
      imdbRating: isNaN(+imdbRating) ? 0 : +imdbRating,
      runtime: isNaN(+runtime.split(" ")[0]) ? 0 : +runtime.split(" ")[0],
      userRating: userRating,
    };
    onAddMovie(watchedMovie);
    onClose();
  }

  function handelRating(newRate) {
    setUserRating(newRate);
  }

  // Function To Get Details From API
  async function getMovie() {
    try {
      setErr("");
      setIsLoading(true);
      const req = await fetch(
        `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`,
        { signal: detailsController.signal }
      );
      const data = await req.json();
      if (!req.ok) {
        throw new Error("Something Went Wrong");
      }
      setMovie(data);
      setIsLoading(false);
    } catch (err) {
      if (err.name !== "AbortError") {
        setErr(err.message);
        console.log(err.message);
      }
    }
  }
  // Call API To Find Details
  useEffect(
    function () {
      getMovie();
      return () => {
        detailsController.abort();
      };
    },
    [movieId]
  );

  // Update Page Title To The Active Movie
  useEffect(
    function () {
      if (title) {
        document.title = `Movie: ${title}`;
      }
      return () => {
        document.title = `usePopcorn`;
      };
    },
    [movie]
  );

  useKeyPress("Escape", onClose);

  return err ? (
    <ErrorMsg msg={err} onReload={getMovie} onReset={setErr} />
  ) : isLoading ? (
    <Loading />
  ) : (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onClose}>
          &larr;
        </button>
        <img src={poster} alt={`Poster Of ${movie}`}></img>
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <IconText icon={"⭐"} text={`${imdbRating} IMDB Rating`} />
        </div>
      </header>
      <section>
        <div className="rating">
          <Stars
            maxRate={10}
            starsSize={18}
            textSize={18}
            updateRate={handelRating}
            rateExist={userRating}
            ownerClass={"stars"}
          />
          {userRating != -1 && (
            <button className="btn-add" onClick={addMovie}>
              {userRating && alreadyRated ? "Update Rate" : "+ Add To List"}
            </button>
          )}{" "}
          {!isNaN(alreadyRated + 1) && (
            <button
              className="btn-add"
              onClick={() => {
                onRemoveMovie(movieIndex);
                onClose();
              }}
            >
              Remove From watched List
            </button>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed By {director}</p>
      </section>
    </div>
  );
}

export default MovieDetails;
