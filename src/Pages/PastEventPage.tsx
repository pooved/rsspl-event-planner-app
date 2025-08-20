import { useContext } from "preact/hooks";
import PastEventListing from "../components/PastEventListing";
import { EventContext } from "../store/EventContext";

export default function PastEvent() {
  //consuming context
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("Error");
  }
  const { state } = context;
  const { events, category, loading } = state;
  if (loading) {
    return <div>Loading list...</div>;
  }
  return (
    <>
      <PastEventListing events={events} category={category} />
    </>
  );
}
