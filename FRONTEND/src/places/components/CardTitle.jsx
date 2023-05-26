import React from "react";

export default function CardTitle(props) {
  return (
    <div className="pt-10 lg:pt-24">
      <h3 className="text-4xl font-bold">{props.title}</h3>
      <p className=" font-light">{props.description}</p>
    </div>
  );
}
