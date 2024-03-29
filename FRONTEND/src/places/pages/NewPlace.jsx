import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import useHttpRequest from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import BackgroundSection from "../../shared/components/UIElements/BackgroundSection";

function NewPlace() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const navigate = useNavigate();

  async function placeSubmitHandler(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/places",
        "POST",
        { Authorization: "Bearer " + auth.token },
        formData
      );
      navigate("/");
    } catch (err) {}
  }

  return (
    <React.Fragment>
      <BackgroundSection>
        <ErrorModal error={error} onClear={clearError} />
        <form
          className="mx-auto p-4 w-11/12 md:w-2/5 shadow-md rounded bg-white"
          onSubmit={placeSubmitHandler}
        >
          {isLoading && <LoadingSpinner asOverlay />}
          <Input
            id="title"
            type="text"
            label="Title"
            element="input"
            errorText="Please input a valid title"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <Input
            id="description"
            label="Description"
            element="textarea"
            errorText="Please enter a valid description (at least 5 characters)"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler}
          />
          <Input
            id="address"
            type="text"
            label="Address"
            element="input"
            errorText="Please enter a valid Address"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
          <ImageUpload
            id="image"
            placeholder="Add a picture"
            onInput={inputHandler}
            errorText="Pleasae provide an image."
          />
          <Button type="submit" disabled={!formState.isValid}>
            Add place
          </Button>
        </form>
      </BackgroundSection>
    </React.Fragment>
  );
}

export default NewPlace;
