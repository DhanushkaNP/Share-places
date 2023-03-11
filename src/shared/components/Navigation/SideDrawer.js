import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";

function SideDrawer(props) {
  return (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer">{props.children}</aside>
    </CSSTransition>
  );
}

export default SideDrawer;
