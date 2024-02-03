import "./../CSS/all.min.css";
import { useState } from "react";
import PropTypes from "prop-types";

function Star({ type, num, styleStar, onHover, onLeave, onChangeRate }) {
  return (
    <i
      role="button"
      className={`fa-${type} fa-star`}
      style={styleStar}
      data-source={num}
      onMouseEnter={() => onHover()}
      onMouseLeave={() => onLeave()}
      onClick={() => onChangeRate()}
    ></i>
  );
}

function Stars({
  updateRate,
  ownerClass,
  maxRate = 5,
  starsColor = "#fcc419",
  starsSize = 16,
  textColor = "#fcc419",
  textSize = 16,
  rateExist = -1,
}) {
  const [tempRate, setTempRate] = useState(rateExist);
  const [rate, setRate] = useState(rateExist);
  // On Click Update The Hover To Make it as Clicked
  function update(i) {
    setRate(i);
    setTempRate(i);
    updateRate && updateRate(i + 1);
  }
  // On Hover Update Hover Number
  // On Mouse Leave Make Hover As Clicked
  const parentStyle = {
    display: "flex",
    padding: "0.2rem",
    gap: "0.5rem",
  };
  const starsContainerStyle = {
    display: "flex",
    gap: "0.5rem",
    width: "fit-content",
  };
  const starStyle = {
    color: starsColor,
    fontSize: `${starsSize}px`,
    cursor: "pointer",
  };
  const starsNumberStyle = {
    fontSize: `${textSize}px`,
    color: textColor,
    transform: "translateY(-3px)",
    height: "1px",
  };
  return (
    <div className={ownerClass} style={parentStyle}>
      <div style={starsContainerStyle}>
        {Array.from({ length: maxRate }, (_, i) => (
          <Star
            key={`start-${i + 1}`}
            type={i <= tempRate ? "solid" : "regular"}
            num={i}
            styleStar={starStyle}
            onHover={() => setTempRate(i)}
            onLeave={() => setTempRate(rate)}
            onChangeRate={() => update(i)}
          />
        ))}
      </div>
      <p style={starsNumberStyle}>{tempRate == -1 ? null : tempRate + 1}</p>
    </div>
  );
}
Stars.propTypes = {
  updateRate: PropTypes.func,
  ownerClass: PropTypes.string,
  maxRate: PropTypes.number,
  starsColor: PropTypes.string,
  starsSize: PropTypes.number,
  textColor: PropTypes.string,
  textSize: PropTypes.number,
  rateExist: PropTypes.number,
};

export default Stars;
