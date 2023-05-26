import React from "react";

export default function CardHolder(props) {
  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-3  ${props.className}`}>
      {props.children}
    </div>
  );
}