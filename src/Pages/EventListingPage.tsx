import { useContext } from "preact/hooks";
import { EventContext } from "../store/EventContext";
import UpComingEventListing from "../components/UpComingEventListing";
import PastEventListing from "../components/PastEventListing";

export default function EventListingPage() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("Error");
  }
  const { state } = context;
  const { events, category } = state;
  return (
    <>
      <UpComingEventListing events={events} category={category} />
    </>
  );
}
