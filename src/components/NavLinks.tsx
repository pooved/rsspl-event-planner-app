import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function NavLinks() {
  return (
    <div className="text-sm lg:flex lg:flex-grow">
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
      <ThemeToggle />
    </div>
  );
}
