import React, { useEffect, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import BackgroundSection from "../../shared/components/UIElements/BackgroundSection";
import CardHolder from "../../shared/components/UIElements/CardHolder";
import CardTitle from "./CardTitle";
// import "./PlaceList.css";

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
      <div className="">
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
        <CardTitle
          title="Explore Places..."
          description="Places that other users shared. enjoy....."
        />
        <CardHolder>
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
        </CardHolder>
      </BackgroundSection>
    );
  } else {
    return (
      <BackgroundSection>
        <CardTitle
          title="All Places..."
          description="Places that other users shared. "
        />
        <CardHolder>
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
        </CardHolder>
      </BackgroundSection>
    );
  }
}

export default PlaceList;
