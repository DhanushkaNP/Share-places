import React from "react";
import { useNavigate } from "react-router-dom";
// import "./Button.css";

const Button = (props) => {
  const navigate = useNavigate();
  function navigateHandler(link) {
    navigate(link);
  }

  if (props.href) {
    return (
      <a
        className={`btn ${props.inverse && "btn-inverse"} ${
          props.danger && "btn-danger"
        }`}
        href={props.href}
      >
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
        className={`btn ${props.inverse && "btn-inverse"} ${
          props.danger && "btn-danger"
        } `}
        onClick={() => navigateHandler(props.to)}
      >
        {props.children}
      </button>
    );
  }

  return (
    <button
      className={`btn ${props.inverse && "btn-inverse"} ${
        props.danger && "btn-danger"
      }`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
