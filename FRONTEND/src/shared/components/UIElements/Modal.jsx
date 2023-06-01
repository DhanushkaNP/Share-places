import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";

function ModalOverlay(props) {
  const content = (
    <div
      className={` z-50 fixed top-[5vh] left-[20%] w-3/5 bg-white shadow-md rounded-md  ${props.className}`}
      style={props.style}
    >
      <header
        className={` w-100 p-4 bg-primary text-white text-xl  ${props.headerClass}`}
      >
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={` py-4 px-2 ${props.contentClass}`}>
          {props.children}
        </div>
        <div className={` p-2 ${props.footerClass}`}>{props.footer}</div>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal"));
}

function Modal(props) {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
}

export default Modal;
