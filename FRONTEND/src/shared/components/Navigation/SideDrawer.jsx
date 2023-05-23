import { CSSTransition } from "react-transition-group";

function SideDrawer(props) {
  return (
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames="slide-in-right"
      mountOnEnter
      unmountOnExit
    >
      <aside className="absolute bg-white z-50 h-screen w-96 shadow-2xl shadow-black">
        {props.children}
      </aside>
    </CSSTransition>
  );
}

export default SideDrawer;
