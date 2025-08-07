import { useContext } from "preact/hooks";
import { EventContext } from "../store/EventContext";
import EventCards from "./EventCards";
import type { IEvent } from "../types/event";

export default function EventListingPage() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("Error");
  }
  const { state } = context;
  const { events } = state;
  return (
    <section>
      <h1>Upcoming Events</h1>
      {events.length === 0 ? (
        <p>no events created yet</p>
      ) : (
        events.map((event: IEvent) => {
          return <EventCards key={event.id} event={event} />;
        })
      )}
    </section>
  );
}
