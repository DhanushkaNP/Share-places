import React from "react";
import Button from "../../shared/components/FormElements/Button";

export default function HomeContent() {
  return (
    <div className="w-fit pt-8 lg:pt-0 lg:mt-20 lg:ml-24 lg:mb-8 box-content">
      <h2 className="text-6xl font-bold">explore beautiful world!</h2>
      <h2 className="text-6xl font-bold">
        Share your beautiful places with us.
      </h2>
      <p className="font-light w-3/4 pt-5">
        Explore perfect, beautiful places with others. Share your beautiful
        location with us.
      </p>
      <h6 className="mt-5">Sign up or Login to add places.</h6>
      <div className="flex flex-row gap-4 mt-5">
        <Button inverse>Login</Button>
        <Button>Sign up</Button>
      </div>
    </div>
  );
}
