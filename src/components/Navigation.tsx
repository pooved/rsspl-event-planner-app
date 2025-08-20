import { Link } from "react-router-dom";
import { useState } from "preact/hooks";
import NavLinks from "./NavLinks";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleNavbar() {
    try {
      setIsOpen(!isOpen);
    } catch (error: any) {
      console.error("Error-handleToggleNavbar:", error);
    }
  }
  return (
    <header class="flex items-center justify-between flex-wrap bg-light p-6 dark:bg-dark">
      <Link to="/" class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">Event Planner</span>
      </Link>

      <div class="block lg:hidden">
        <button
          onClick={handleToggleNavbar}
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block  lg:flex lg:items-center lg:w-auto hidden">
        <div class="text-sm lg:flex flex">
          <NavLinks />
        </div>
      </div>
      {isOpen && (
        <div class="w-full block flex-grow lg:hidden">
          <NavLinks />
        </div>
      )}
    </header>
  );
}
