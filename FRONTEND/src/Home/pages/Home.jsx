import React from "react";
import Places from "../../places/components/Places";
import HomeContent from "../components/HomeContent";
import HomeImage from "../components/HomeImage";
import BackgroundSection from "../../shared/components/UIElements/BackgroundSection";
import NavigationTrigger from "../../shared/components/Navigation/NavigationTrigger";

function Home() {
  return (
    <React.Fragment>
      <BackgroundSection>
        <NavigationTrigger />
        <div className="lg:grid lg:grid-cols-2 h-max lg:p-12 pb-0">
          {/* first grid child */}
          <HomeContent />

          {/* second grid child */}
          <HomeImage />
        </div>
      </BackgroundSection>

      <div className="h-min bg-secondary/50">
        <Places main link={"/places/all"} />
      </div>
    </React.Fragment>
  );
}

export default Home;
