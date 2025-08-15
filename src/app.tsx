import EventCreationPage from "./Pages/EventCreationPage";
import EventDetailsPage from "./Pages/EventDetailsPage";
import EventEditPage from "./Pages/EventEditPage";
import EventListingPage from "./Pages/EventListingPage";
import Layout from "./layout/Layout";
import NotFoundPage from "./Pages/NotFoundPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { EventContextProvider } from "./store/EventContext";
import PastEventListing from "./Pages/PastEventListing";
import PastEventPage from "./Pages/PastEventPage";

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
