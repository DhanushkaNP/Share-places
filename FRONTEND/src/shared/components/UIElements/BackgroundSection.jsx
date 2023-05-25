import React from "react";

export default function BackgroundSection(props) {
  return (
    <div className="bg-gradient-to-b from-secondary from-5% to-white to-50% h-max lg:px-16 ">
      {props.children}
    </div>
  );
}
