import { NavLink } from "react-router-dom";

export default function NavLinks() {
  return (
    <div className="text-sm lg:flex-grow">
      <NavLink
        to="/create"
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Create An Event
      </NavLink>
    </div>
  );
}
