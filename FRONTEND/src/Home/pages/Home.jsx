import React from "react";
import Places from "../../places/components/Places";
import Button from "../../shared/components/FormElements/Button";
import main from "../../assets/images/landing-main.png";
import HomeContent from "../components/HomeContent";

function Home() {
  return (
    <React.Fragment>
      <div className="bg-gradient-to-b from-secondary from-5% to-white to-50% h-max lg:px-16 ">
        <div className="lg:grid lg:grid-cols-2 h-max lg:p-12 pb-0">
          {/* first grid child */}
          <HomeContent />

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
