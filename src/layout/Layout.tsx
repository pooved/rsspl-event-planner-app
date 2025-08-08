import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function Layout() {
  return (
    <>
      <Navigation />
      <main class="p-5">
        <Outlet />
      </main>
    </>
  );
}
