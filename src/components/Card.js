import React from "react";

function Card({ card, onClick, flip, match }) {
  return (
    <div className={`card ${flip || match ? "flipped" : ""}`} onClick={() => !flip && !match && onClick()} >
      <div className="card-inner">
        <div className="card-front">?</div>
        <div className="card-back">
          <img src={card} alt="Memory card" />
        </div>
      </div>
    </div>
  );
}

export default Card;
