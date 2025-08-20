import EventCreationPage from "./Pages/EventCreationPage";
import EventDetailsPage from "./Pages/EventDetailsPage";
import EventEditPage from "./Pages/EventEditPage";
import EventListingPage from "./Pages/EventListingPage";
import Layout from "./layout/Layout";
import NotFoundPage from "./Pages/NotFoundPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EventContextProvider } from "./store/EventContext";
import PastEventListing from "./components/PastEventListing";
import PastEventPage from "./Pages/PastEventPage";
import LoginPage from "./Pages/LoginPage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <EventListingPage />,
      },
      {
        path: "/create",
        element: <EventCreationPage />,
      },
      {
        path: "edit/:id",
        element: <EventEditPage />,
      },
      {
        path: "event/:id",
        element: <EventDetailsPage />,
      },
      {
        path: "past",
        element: <PastEventPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
];
const router = createBrowserRouter(routes);
export default function App() {
  return (
    <EventContextProvider>
      <RouterProvider router={router} />
    </EventContextProvider>
  );
}
