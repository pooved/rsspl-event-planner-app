import { useState } from "preact/hooks";
import PaginationEvent from "../components/PaginationEvent";
import type { FilterCriteria, ICategory, IEvent } from "../types/event";
import EventCards from "./EventCards";

export default function PastEventListing({
  events,
  category,
}: {
  events: IEvent[];
  category: ICategory[];
}) {
  const filterEvent = new Date();

  const pastEvents = events.filter(
    (event) => event.date <= filterEvent.toLocaleDateString("en-CA")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const pastEventsList = pastEvents.slice(firstIndex, lastIndex);
  const nPagePastEvents = Math.ceil(pastEvents.length / recordsPerPage);
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
      <h1 className="text-2xl font-medium text-secondary my-4">Past Events</h1>
      {pastEventsList.length === 0 ? (
        <p>no events</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 *:rounded-sm">
            {pastEventsList.map((event) => (
              <EventCards key={event.id} event={event} />
            ))}
          </div>
          <PaginationEvent
            currentPage={currentPage}
            nPage={nPagePastEvents}
            changeCPage={changeCPage}
            nextPage={nextPage}
            prePage={prePage}
          />
        </>
      )}
    </section>
  );
}
