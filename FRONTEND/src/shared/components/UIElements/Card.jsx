import React from "react";
import { twMerge } from "tailwind-merge";

// import "./Card.css";

function Card(props) {
  const style = twMerge(
    "shadow-md rounded-md bg-white overflow-hidden",
    props.className
  );
  return (
    <div className={style} style={props.style}>
      {props.children}
    </div>
  );
}

export default Card;
