import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "preact/hooks";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]); // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <button
      onClick={toggleTheme}
      className=" rounded-md py-3 lg:py-0 text-black dark:text-white cursor-pointer"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}
