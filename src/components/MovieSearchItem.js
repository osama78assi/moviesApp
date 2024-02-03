import IconText from "./IconText";

// Item For Searched Movies
function MovieSearchItem({ movie, onClickMovie }) {
  return (
    <li onClick={() => onClickMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <IconText icon={"🗓"} text={movie.Year} />
      </div>
    </li>
  );
}

export default MovieSearchItem;
