import React from "react";

export default function BackgroundSection(props) {
  return (
    <div
      className={`bg-gradient-to-b from-secondary from-5% to-white to-50% h-max px-4 lg:px-16 ${props.className}`}
    >
      {props.children}
    </div>
  );
}
