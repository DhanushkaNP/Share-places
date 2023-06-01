import { useEffect, useReducer } from "react";
import { validate } from "../../util/validators";

function inputReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
}

function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isValid: props.valid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  function changeHandler(event) {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  }

  function touchHandler() {
    dispatch({
      type: "TOUCH",
    });
  }

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        placeholder={props.placeholder}
        type={props.type}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
        className="w-full text-base p-2 rounded border border-form"
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
        onBlur={touchHandler}
        className="w-full text-base p-2 rounded border border-form"
      />
    );

  return (
    <div
      className={` py-2 w-full ${
        !inputState.isValid &&
        inputState.isTouched &&
        " [&>input]:border-red-600 [&>input]:border-2"
      }`}
    >
      {/* <label htmlFor={props.id}>{props.label}</label> */}
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p className=" text-red-600 text-sm font-light">{props.errorText}</p>
      )}
    </div>
  );
}

export default Input;
