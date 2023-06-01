import React from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
// import "./Button.css";

const Button = (props) => {
  const navigate = useNavigate();
  function navigateHandler(link) {
    navigate(link);
  }

  const styles = `btn ${
    !!props.disabled && " !bg-form !border-form !text-white"
  } ${!!props.inverse && "btn-inverse"} ${!!props.danger && "btn-danger"}`;

  if (props.href) {
    return (
      <a className={twMerge(styles, props.className)} href={props.href}>
        {props.children}
      </a>
    );
  }

  if (props.to && props.white) {
    return (
      <button
        className={" btn-white"}
        onClick={() => navigateHandler(props.to)}
      >
        {props.children}
      </button>
    );
  }

  if (props.to) {
    return (
      <button
        className={twMerge(styles, props.className)}
        onClick={() => navigateHandler(props.to)}
      >
        {props.children}
      </button>
    );
  }

  return (
    <button
      className={twMerge(styles, props.className)}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
