import { useState } from "react";
// Toggle Button For Containers
function ToggleSectionBtn({ state, onToggle }) {
  return (
    <button className="btn-toggle" onClick={() => onToggle((open) => !open)}>
      {state ? "–" : "+"}
    </button>
  );
}

// Box Container
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ToggleSectionBtn state={isOpen} onToggle={setIsOpen} />
      {isOpen && children}
    </div>
  );
}

export default Box;
