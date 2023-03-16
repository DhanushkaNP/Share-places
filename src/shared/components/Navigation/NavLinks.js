import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "../FormElements/Button";
import "./NavLinks.css";

function NavLinks(props) {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li onClick={props.onClick}>
        <NavLink to="/">ALL USERS</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li onClick={props.onClick}>
          <NavLink to="/u1/places">MY PLACES</NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
        <li onClick={props.onClick}>
          <NavLink to="/places/new">ADD PLACES</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li onClick={props.onClick}>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li onClick={props.onClick}>
          <Button type="button" onClick={auth.logout}>
            Logout
          </Button>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
