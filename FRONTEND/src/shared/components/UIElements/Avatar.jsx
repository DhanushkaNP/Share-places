import React from "react";

function Avatar(props) {
  return (
    <div
      className={`flex justify-center ${props.className}`}
      style={props.style}
    >
      <img
        className="rounded-full w-full h-full object-cover"
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
}

export default Avatar;
