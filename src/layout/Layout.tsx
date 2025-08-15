import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useEffect, useState } from "preact/hooks";

export default function Layout() {
  return (
    <div>
      <Navigation />
      <main class="p-5">
        <Outlet />
      </main>
    </div>
  );
}
