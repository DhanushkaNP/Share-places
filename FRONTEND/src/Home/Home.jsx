import React from "react";
import Places from "../places/components/Places";
import Button from "../shared/components/FormElements/Button";
import main from "../assets/images/landing-main.png";

function Home() {
  return (
    <React.Fragment>
      <div className="bg-gradient-to-b from-secondary from-5% to-white to-50% h-max lg:px-16 ">
        <div className="lg:grid lg:grid-cols-2 h-max lg:p-12 pb-0">
          {/* first grid child */}
          <div className="mx-4 w-fit pt-8 lg:pt-0 lg:mt-20 lg:ml-24 lg:mb-8 box-content">
            <h2 className="text-5xl font-bold">explore beautiful world!</h2>
            <h2 className="text-5xl font-bold">
              Share your beautiful places with us.
            </h2>
            <p className="font-light w-3/4 pt-5">
              Explore perfect, beautiful places with others. Share your
              beautiful location with us.
            </p>
            <h6 className="mt-5">Sign up or Login to add places.</h6>
            <div className="flex flex-row gap-4 mt-5">
              <Button inverse>Login</Button>
              <Button>Sign up</Button>
            </div>
          </div>

          {/* second grid child */}

          <div className="border-8 shadow-lg box-border overflow-hidden m-6 hidden lg:block">
            <img
              src={main}
              alt="A person enjoying the view of mountain landscape"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="h-min w-full bg-secondary/50">
        <Places main link={"/places/all"} />
      </div>
    </React.Fragment>
  );
}

export default Home;
