import React from "react";
import main from "../../assets/images/landing-main.png";

export default function HomeImage() {
  return (
    <div className="border-8 shadow-lg box-border overflow-hidden m-6 hidden lg:block">
      <img
        src={main}
        alt="A person enjoying the view of mountain landscape"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
