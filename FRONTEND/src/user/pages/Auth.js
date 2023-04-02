import React, { useState, useContext } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/components/util/validators";
import "./Auth.css";

function Auth() {
  const auth = useContext(AuthContext);
  const [isLoging, setIsLoging] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  async function authSubmitHandler(event) {
    event.preventDefault();

    if (isLoging) {
    } else {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Somthing went wrong, please try again.");
      }
    }
  }

  function switchModeHandler() {
    if (!isLoging) {
      setFormData(
        { ...formState.inputs, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoging((prevVlaue) => !prevVlaue);
  }

  function errorHandler() {
    setError(null);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoging ? "Login" : "Signup"} Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoging && (
            <Input
              element="input"
              type="text"
              id="name"
              label="Name"
              errorText="Please Enter a Name here"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            type="email"
            id="email"
            label="Email"
            errorText="Please Enter a valid Email address"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          <Input
            element="input"
            type="password"
            id="password"
            label="Password"
            errorText="Please Enter a valid password (requrie at least 8 characters"
            validators={[VALIDATOR_MINLENGTH(8)]}
            onInput={inputHandler}
          />
          <Button inverse onClick={switchModeHandler} type="button">
            {isLoging ? "Switch to SignUp" : "Switch to Login"}
          </Button>
          <Button type="submit" disabled={!formState.isValid}>
            {isLoging ? "Login" : "SignUp"}
          </Button>
        </form>
      </Card>
    </React.Fragment>
  );
}

export default Auth;
