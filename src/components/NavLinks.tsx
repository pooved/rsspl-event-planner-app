import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../store/AuthContext";
import { useContext } from "preact/hooks";

export default function NavLinks() {
     const context= useContext(AuthContext);
      if (!context) {
      throw new Error("Error");
    }
     const {state}=context;
     const {isAuthenticated}=state
  return (
    <div className="text-sm lg:flex lg:flex-grow">
       {isAuthenticated ? (
        <>
        <p className="text-white lg:mr-2 mr-0 mt-2 lg:mt-0">Welcome!, {state.user?.userName}</p>
          <NavLink
        to="/create"
        className="block mt-4 px-2  lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer"
      >
        Create An Event
      </NavLink>
      <NavLink
        to="/past"
        className="block px-2 mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer"
      >
        Past Events
      </NavLink>
         </>
      ) : ""}
    
      <ThemeToggle />
    </div>
  );
}
