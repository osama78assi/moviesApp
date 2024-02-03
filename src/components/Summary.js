import IconText from "./IconText";
import { average } from "../helper";

// For Summery Component
function Summary({ movies }) {
  const avgImdbRating = Number(
    average(movies.map((movie) => movie.imdbRating))
  ).toFixed(2);
  const avgUserRating = Number(
    average(movies.map((movie) => movie.userRating))
  ).toFixed(2);
  const avgRuntime = Number(
    average(movies.map((movie) => movie.runtime))
  ).toFixed(2);
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <IconText icon={"#️⃣"} text={`${movies.length} movies`} />
        <IconText icon={"⭐️"} text={avgImdbRating} />
        <IconText icon={"🌟"} text={avgUserRating} />
        <IconText icon={"⏳"} text={`${avgRuntime} min`} />
      </div>
    </div>
  );
}

export default Summary;
