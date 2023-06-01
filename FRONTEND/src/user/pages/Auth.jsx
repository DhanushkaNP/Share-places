import React, { useState, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { NavContext } from "../../shared/context/nav-context";
import { AuthContext } from "../../shared/context/auth-context";
import useHttpRequest from "../../shared/hooks/http-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import BackgroundSection from "../../shared/components/UIElements/BackgroundSection";

// import "./Auth.css";

function Auth() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const nav = useContext(NavContext);
  nav.setNav(false);
  const [isLoging, setIsLoging] = useState(true);

  const currentPath = useLocation().pathname;
  useEffect(() => {
    if (currentPath === "/signup") {
      setIsLoging(false);
    } else {
      setIsLoging(true);
    }
  }, [currentPath]);

  const { isLoading, error, sendRequest, clearError } = useHttpRequest();

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
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          {
            "Content-type": "application/json",
          },
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
        );
        auth.login(responseData.userId, responseData.token);
        navigate("/");
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          {},
          formData
        );

        auth.login(responseData.userId, responseData.token);
        navigate("/");
      } catch (err) {}
    }
  }

  function switchModeHandler() {
    if (!isLoging) {
      setFormData(
        { ...formState.inputs, name: undefined, image: undefined },
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
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoging((prevVlaue) => !prevVlaue);
  }

  return (
    <BackgroundSection className=" !px-0 lg:px-4">
      <ErrorModal error={error} onClear={clearError} />
      <div
        className={`flex justify-center items-center -mt-10 h-screen my-auto ${
          !isLoging && " !mt-0"
        }`}
      >
        <Card
          className={`w-5/6 md:w-1/2 lg:w-1/3 ${
            !isLoging && " lg:w-2/5"
          } p-5 shadow-xl`}
        >
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="flex justify-between my-2">
            <h2 className=" inline-block text-2xl font-semibold">
              {isLoging ? "Login" : "Signup"}
            </h2>
            <button
              onClick={switchModeHandler}
              type="button"
              className=" text-sm text-[#0098EA] hover:text-primary"
            >
              {isLoging ? "Switch to SignUp" : "Switch to Login"}
            </button>
          </div>

          <form onSubmit={authSubmitHandler}>
            {!isLoging && (
              <ImageUpload
                id="image"
                placeholder="Upload a profile picture"
                center
                onInput={inputHandler}
                errorText="Please provide an image."
              />
            )}
            {!isLoging && (
              <Input
                element="input"
                type="text"
                id="name"
                label="Name"
                errorText="Please Enter a Name here"
                validators={[VALIDATOR_REQUIRE()]}
                onInput={inputHandler}
                placeholder="Enter your name"
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
              placeholder="Enter Your Email Address"
            />
            <Input
              element="input"
              type="password"
              id="password"
              label="Password"
              errorText="Please Enter a valid password (requrie at least 8 characters)"
              validators={[VALIDATOR_MINLENGTH(8)]}
              onInput={inputHandler}
              placeholder="Password"
            />
            <hr className=" mb-5 mt-2" />
            <div className="flex justify-between last:items-end">
              <Button
                type="submit"
                disabled={!formState.isValid}
                className="inline-block !py-2 !px-5"
              >
                {isLoging ? "Login" : "SignUp"}
              </Button>
              <Link
                to="/"
                className=" ml-auto underline text-[#0098EA] hover:text-primary"
              >
                Home
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </BackgroundSection>
  );

  // return createPortal(content, document.getElementById("auth"));
}

export default Auth;
