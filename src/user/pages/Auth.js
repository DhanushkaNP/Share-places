import { useState, useContext } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
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

  function loginHandler(event) {
    event.preventDefault();
    auth.login();
    console.log(formState.inputs);
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

  return (
    <Card className="authentication">
      <h2>{isLoging ? "Login" : "Signup"} Required</h2>
      <hr />
      <form onSubmit={loginHandler}>
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
  );
}

export default Auth;
