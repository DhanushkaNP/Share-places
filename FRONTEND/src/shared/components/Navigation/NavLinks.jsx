import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "../FormElements/Button";
import AddIcon from "@mui/icons-material/Add";

function NavLinks(props) {
  const auth = useContext(AuthContext);

  const navLinkStyle = ({ isActive }) => {
    return isActive
      ? "font-bold lg:underline decoration-0 underline-offset-8 w-max"
      : "font-normal align-middle w-max";
  };

  return (
    <ul className="flex flex-col h-full first:align-bottom lg:first:justify-center lg:flex-row gap-16 text-xl w-full ">
      <div className="flex flex-col w-full lg:w-min h-full lg:justify-center lg:flex-row lg:h-20 items-end lg:items-center lg:text-xl lg:gap-32 lg:mt-0 gap-0 mt-20 text-2xl z-20">
        <li
          onClick={props.onClick}
          className="w-40 lg:w-fit h-16 lg:h-fit flex flex-col justify-center border-b-2 lg:border-0"
        >
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>
        </li>

        {!auth.isLoggedIn && (
          <li
            onClick={props.onClick}
            className="w-40 lg:w-fit h-16 lg:h-fit flex flex-col justify-center border-b-2 lg:border-0"
          >
            <NavLink to="/places" className={navLinkStyle}>
              Places
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li
            onClick={props.onClick}
            className="w-40 lg:w-fit h-16 lg:h-fit flex flex-col justify-center border-b-2 lg:border-0"
          >
            <NavLink to="/users" className={navLinkStyle}>
              Users
            </NavLink>
          </li>
        )}
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
      <div className="absolute flex w-full h-20 gap-3 items-center justify-end pr-8 bg-[#EEF3F8] lg:bg-transparent">
        {auth.isLoggedIn && (
          <li onClick={props.onClick}>
            <Button to="/places/new" inverse className=" !pl-0 !pr-1 ">
              <AddIcon />
              ADD A PLACE
            </Button>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li onClick={props.onClick}>
            <Button to="/login" className={navLinkStyle} inverse>
              Login
            </Button>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li onClick={props.onClick}>
            <Button to="/signup" className={navLinkStyle} inverse>
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
