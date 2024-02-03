import IconText from "./IconText";

// Item For Watched Movie
function MovieWatchedItem({ movie, movieIndex, onDelete, onSelectMovie }) {
  function handelClick(e) {
    if(e.target.className != "btn-delete") {
      onSelectMovie(movie.imdbID);
    }
  }
  return (
    <li onClick={(e) => handelClick(e)}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <IconText icon={"⭐️"} text={movie.imdbRating} />
        <IconText icon={"🌟"} text={movie.userRating} />
        <IconText icon={"⏳"} text={`${movie.runtime} min`} />
        <button className="btn-delete" onClick={() => onDelete(movieIndex)}>X</button>
      </div>
    </li>
  );
}

export default MovieWatchedItem;
