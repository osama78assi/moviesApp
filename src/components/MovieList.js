import MovieWatchedItem from "./MovieWatchedItem";
import MovieSearchItem from "./MovieSearchItem";

function MoviesList({ movies, type, onSelectMovie, onDelete }) {
  // If The Items Was Watched Render Watched List
  // Or Render The Movies List
  if (type == "watched") {
    return (
      <ul className="list list-movies">
        {movies.map((movie, index) => (
          <MovieWatchedItem
            key={movie.imdbID}
            movie={movie}
            movieIndex={index}
            onDelete={onDelete}
            onSelectMovie={onSelectMovie}
          />
        ))}
      </ul>
    );
  }

  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieSearchItem
          key={movie.imdbID}
          movie={movie}
          onClickMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}

export default MoviesList;
