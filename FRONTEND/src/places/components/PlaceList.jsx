import React, { useEffect, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import BackgroundSection from "../../shared/components/UIElements/BackgroundSection";

function PlaceList(props) {
  const [sixPlaces, setSixPlaces] = useState([]);
  console.log(props.items.length);
  useEffect(() => {
    if (props.items.length > 6) {
      const result = props.items.slice(0, 6);
      setSixPlaces(result);
    } else {
      console.log(props.items);
      setSixPlaces(props.items);
    }
  }, [props.items]);

  console.log(sixPlaces);

  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h1>Nothing found!!!. Maybe create one?</h1>
          <Button to="/places/new">Share places</Button>
        </Card>
      </div>
    );
  }
  if (props.main) {
    return (
      <BackgroundSection className="bg-none mt-8 lg:mt-0">
        <div className="pt-10 lg:pt-24">
          <h3 className="text-4xl font-bold">Explore Places...</h3>
          <p className=" font-light">
            Places that other users shared. enjoy.....
          </p>
        </div>
        {sixPlaces.map((place) => (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
            onDelete={props.onDeletePlace}
          />
        ))}
      </BackgroundSection>
    );
  } else {
    return (
      <BackgroundSection>
        {props.items.map((place) => (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
            onDelete={props.onDeletePlace}
          />
        ))}
      </BackgroundSection>
    );
  }
}

export default PlaceList;
