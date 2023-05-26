import React from "react";

// import "./Card.css";

function Card(props) {
  return (
    <div
      className={` shadow-md rounded-md bg-white overflow-hidden ${props.className}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
}

export default Card;
