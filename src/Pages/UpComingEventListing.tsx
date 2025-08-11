import { useState } from "preact/hooks";
import PaginationEvent from "../components/PaginationEvent";
import type { IEvent } from "../types/event";
import EventCards from "./EventCards";

export default function UpComingEventListing({ events }: { events: IEvent[] }) {
  const filterEvent = new Date();
  const upcomingEvents = events.filter(
    (event) => event.date > filterEvent.toLocaleDateString("en-CA")
  );
  const pastEvents = events.filter(
    (event) => event.date <= filterEvent.toLocaleDateString("en-CA")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const upcomingEventsList = upcomingEvents.slice(firstIndex, lastIndex);
  const pastEventsList = pastEvents.slice(firstIndex, lastIndex);
  const nPagePastEvents = Math.ceil(pastEvents.length / recordsPerPage);
  const nPageUpcomingEvents = Math.ceil(upcomingEvents.length / recordsPerPage);
  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }
  function changeCPage(id: number) {
    setCurrentPage(id);
  }
  return (
    <section className="flex flex-col gap-8">
      <h1 className="text-2xl font-medium text-secondary my-4">
        Upcoming Events
      </h1>
      {upcomingEvents.length === 0 ? (
        <p>no Upcoming events</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 *:rounded-sm">
            {upcomingEventsList.map((event) => (
              <EventCards key={event.id} event={event} />
            ))}
          </div>
          <PaginationEvent
            currentPage={currentPage}
            nPage={nPageUpcomingEvents}
            changeCPage={changeCPage}
            nextPage={nextPage}
            prePage={prePage}
          />
        </>
      )}
    </section>
  );
}
