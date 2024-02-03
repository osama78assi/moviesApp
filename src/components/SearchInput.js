import { useEffect, useRef, useState } from "react";
import { useKeyPress } from "../helper";
// Search Input Component
function SearchInput({ onChangeQuery, onReset }) {
  const [tempQuery, setTempQuery] = useState("");
  const inputElement = useRef(null);
  function changeQuery(e) {
    e.preventDefault();
    if (tempQuery != "") {
      onChangeQuery(tempQuery);
      setTempQuery("");
      onReset("");
      inputElement.current.blur();
    }
  }

  useKeyPress("Enter", function () {
    inputElement.current.focus();
  });

  return (
    <form onSubmit={(e) => changeQuery(e)}>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={tempQuery}
        onChange={(e) => setTempQuery(e.target.value)}
        ref={inputElement}
      />
    </form>
  );
}

export default SearchInput;
