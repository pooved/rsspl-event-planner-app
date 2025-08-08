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
  const filterEvent = new Date();
  const upcomingEvents = events.filter(
    (event) => event.date > filterEvent.toLocaleDateString("en-CA")
  );
  const pastEvents = events.filter(
    (event) => event.date <= filterEvent.toLocaleDateString("en-CA")
  );
  return (
    <>
      <section className="flex flex-col gap-8">
        <h1 className="text-2xl font-medium text-secondary my-4">
          Upcoming Events
        </h1>
        {upcomingEvents.length === 0 ? (
          <p>no Upcoming events</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 *:rounded-sm">
            {upcomingEvents.map((event) => (
              <EventCards key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
      <section className="flex flex-col gap-8">
        <h1 className="text-2xl font-medium text-secondary my-4">
          Past Events
        </h1>
        {pastEvents.length === 0 ? (
          <p>No Past events</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 *:rounded-sm">
            {pastEvents.map((event) => (
              <EventCards key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
