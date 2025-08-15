import { useContext } from "preact/hooks";
import PastEventListing from "./PastEventListing";
import { EventContext } from "../store/EventContext";

export default function PastEvent() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("Error");
  }
  const { state } = context;
  const { events, category } = state;
  return (
    <>
      <PastEventListing events={events} category={category} />
    </>
  );
}
