import { useContext } from "preact/hooks";
import { EventContext } from "../store/EventContext";
import UpComingEventListing from "./UpComingEventListing";
import PastEventListing from "./PastEventListing";

export default function EventListingPage() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("Error");
  }
  const { state } = context;
  const { events } = state;
  return (
    <>
      <UpComingEventListing events={events} />
      <PastEventListing events={events} />
    </>
  );
}
