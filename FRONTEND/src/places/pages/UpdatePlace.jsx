import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import useHttpRequest from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import "./PlaceForm.css";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

function UpdatePlace() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();

  const [placeData, setPlaceData] = useState();
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

  useEffect(() => {
    async function fetchPlace() {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/places/${placeId}`
        );
        setPlaceData(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    }
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  if (!placeData && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  async function placeUpdateSubmitHandler(event) {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/places/${placeId}`,
        "PATCH",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        })
      );
      navigate("/" + auth.userId + "/places");
    } catch (err) {}
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
    </React.Fragment>
  );
}

export default UpdatePlace;
