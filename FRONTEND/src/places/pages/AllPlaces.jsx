import React from "react";
import Places from "../components/Places";
import NavigationTrigger from "../../shared/components/Navigation/NavigationTrigger";

function AllPlaces() {
  return (
    <>
      <NavigationTrigger />
      <Places link={"/places/all"} />;
    </>
  );
}

export default AllPlaces;
