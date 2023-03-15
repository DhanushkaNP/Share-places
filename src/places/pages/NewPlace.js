import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

function NewPlace() {
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
    },
    false
  );

  function placeSubmitHandler(event) {
    event.preventDefault();
    console.log(formState.inputs);
  }

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
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
      <Button type="submit" disabled={!formState.isValid}>
        Add place
      </Button>
    </form>
  );
}

export default NewPlace;
