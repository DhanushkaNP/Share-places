import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "../FormElements/Button";
// import "./NavLinks.css";

function NavLinks(props) {
  const auth = useContext(AuthContext);

  const navLinkStyle = ({ isActive }) => {
    return isActive
      ? "font-bold lg:underline decoration-0 underline-offset-8 "
      : "font-normal align-middle";
  };

  return (
    <ul className="flex flex-col h-full lg:flex-row gap-16 text-xl w-full lg:w-max">
      <div className="flex flex-col h-full items-end lg:flex-row lg:h-20 lg:items-center lg:text-xl lg:gap-32 lg:mt-0 gap-0 z-50 mt-20 text-2xl">
        <li
          onClick={props.onClick}
          className="w-40 lg:w-fit h-16 lg:h-fit flex flex-col justify-center border-b-2 lg:border-0"
        >
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>
        </li>

        <li
          onClick={props.onClick}
          className="w-40 lg:w-fit h-16 lg:h-fit flex flex-col justify-center border-b-2 lg:border-0"
        >
          <NavLink to="/places" className={navLinkStyle}>
            Places
          </NavLink>
        </li>
        {auth.isLoggedIn && (
          <li
            onClick={props.onClick}
            className="w-40 lg:w-fit h-16 lg:h-fit flex flex-col justify-center border-b-2 lg:border-0"
          >
            <NavLink to={`/${auth.userId}/places`} className={navLinkStyle}>
              MY PLACES
            </NavLink>
          </li>
        )}
      </div>
      <div className="absolute flex w-full h-20 z-0 gap-3 justify-end lg:justify-center pr-8 items-center bg-[#EEF3F8] lg:bg-transparent">
        {auth.isLoggedIn && (
          <li onClick={props.onClick}>
            <NavLink to="/places/new" className={navLinkStyle}>
              ADD PLACES
            </NavLink>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li onClick={props.onClick}>
            <Button to="/auth" className={navLinkStyle} inverse>
              Login
            </Button>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li onClick={props.onClick}>
            <Button to="/auth" className={navLinkStyle} inverse>
              Sign up
            </Button>
          </li>
        )}

        {auth.isLoggedIn && (
          <li onClick={props.onClick}>
            <Button type="button" onClick={auth.logout}>
              Logout
            </Button>
          </li>
        )}
      </div>
    </ul>
  );
}

export default NavLinks;
