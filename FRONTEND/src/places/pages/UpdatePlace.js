import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire state building",
    description: "One of the most sky scraper in the world!",
    imageUrl:
      "https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=1024x1024&w=is&k=20&c=2XpMl1tWgCAAQ55ZI4PcMYr1CQTIs7JMkpfDzJSRJiE=",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire state building",
    description: "One of the most sky scraper in the world!",
    imageUrl:
      "https://media.istockphoto.com/id/486334510/photo/new-york-city-skyline.jpg?s=1024x1024&w=is&k=20&c=2XpMl1tWgCAAQ55ZI4PcMYr1CQTIs7JMkpfDzJSRJiE=",
    address: "20 W 34th St., New York, NY 10001, United States",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u2",
  },
];

function UpdatePlace() {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const foundPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  useEffect(() => {
    if (foundPlace) {
      setFormData(
        {
          title: {
            value: foundPlace.title,
            isValid: true,
          },
          description: {
            value: foundPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, foundPlace]);

  if (!foundPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  function placeUpdateSubmitHandler(event) {
    event.preventDefault();
    console.log(formState.inputs);
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading</h2>
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        element="input"
        id="title"
        type="text"
        value={formState.inputs.title.value}
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        valid={formState.inputs.title.isValid}
        errorText="Please input a valid title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        value={formState.inputs.description.value}
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        valid={formState.inputs.description.isValid}
        errorText="Please enter a valid description (at least 5 characters)"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  );
}

export default UpdatePlace;
