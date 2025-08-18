import { useMemo, useState } from "preact/hooks";
import PaginationEvent from "./PaginationEvent";
import type { FilterCriteria, ICategory, IEvent } from "../types/event";
import EventCards from "./EventCards";
import DatePicker from "react-datepicker"; // Example using react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import { ListFilter } from "lucide-react";
export default function PastEventListing({
  events,
  category,
}: {
  events: IEvent[];
  category: ICategory[];
}) {
  const filterEvent = new Date();

  const [filters, setFilters] = useState<FilterCriteria>({
    searchText: "",
    category: "",
    date: new Date(),
  });

  const pastEvents = events.filter(
    (event) => event.date <= filterEvent.toLocaleDateString("en-CA")
  );
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const pastEventsList = pastEvents.slice(firstIndex, lastIndex);
  const nPagePastEvents = Math.ceil(pastEvents.length / recordsPerPage);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isOPen, setIsOpen] = useState(false);
  const toggleCollapse = () => {
    setIsOpen(!isOPen); // Toggle the state
  };
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
  const filteredItems = useMemo(() => {
    let tempItems = pastEventsList; // Assuming 'data' is your original array of items

    if (filters.searchText) {
      tempItems = tempItems.filter((item) =>
        item.title.toLowerCase().includes(filters.searchText.toLowerCase())
      );
    }

    if (filters.category) {
      tempItems = tempItems.filter(
        (item) => item.category === filters.category
      );
    }
    if (filters.date) {
      tempItems = tempItems.filter((item) => {
        const itemDate = new Date(item.date); // Convert item date string to Date object

        const isAfterStartDate = startDate ? itemDate >= startDate : true;
        const isBeforeEndDate = endDate ? itemDate <= endDate : true;
        return isAfterStartDate && isBeforeEndDate;
      });
    }

    return tempItems;
  }, [pastEventsList, filters, startDate, endDate]);
  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium text-secondary">Upcoming Events</h1>
        {pastEventsList.length === 0 ? (
          ""
        ) : (
          <button
            class="bg-transparent  font-normal mx-2  border-transparent"
            onClick={toggleCollapse}
          >
            <ListFilter />
          </button>
        )}
      </div>
      <h1 className="text-2xl font-medium text-secondary my-4">Past Events</h1>
      {isOPen && (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 overflow-hidden">
          <div>
            <input
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow focus:outline-none focus:shadow-outline"
              placeholder="Search by name..."
              value={filters.searchText}
              onChange={(e: any) =>
                setFilters((prev) => ({ ...prev, searchText: e.target.value }))
              }
            />
          </div>
          <div class="">
            <select
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow focus:outline-none focus:shadow-outline"
              value={filters.category}
              onChange={(e: any) =>
                setFilters((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option value="">All Categories</option>
              {category.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
          <div class="flex gap-3">
            <DatePicker
              className="dblock appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-3 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              selected={startDate}
              onChange={(date: Date | null) => {
                setStartDate(date);
                setFilters((prev) => ({ ...prev, date: startDate }));
              }}
              placeholderText="Select start date"
              showIcon
            />
            <DatePicker
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              selected={endDate}
              minDate={new Date()}
              onChange={(date: Date | null) => {
                setEndDate(date);
                setFilters((prev) => ({ ...prev, date: startDate }));
              }}
              placeholderText="Select end date"
              showIcon
            />
          </div>
        </div>
      )}

      {pastEventsList.length === 0 ? (
        <p>no Past Events</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 *:rounded-sm">
            {filteredItems.map((event) => (
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
