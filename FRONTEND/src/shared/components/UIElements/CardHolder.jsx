import React from "react";

export default function CardHolder(props) {
  return (
    <div
      className={`grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-10 pb-12 h-min ${props.className}`}
    >
      {props.children}
    </div>
  );
}
