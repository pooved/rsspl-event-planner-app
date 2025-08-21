import { useMemo, useState } from "preact/hooks";
import PaginationEvent from "./PaginationEvent";
import type { FilterCriteria, ICategory, IEvent } from "../types/event";
import DatePicker from "react-datepicker"; // Example using react-datepicker
import "react-datepicker/dist/react-datepicker.css";
import { ListFilter } from "lucide-react";
import EventCards from "./EventCards";

export default function UpComingEventListing({
  events,
  category,
}: {
  events: IEvent[];
  category: ICategory[];
}) {
  const [filters, setFilters] = useState<FilterCriteria>({
    searchText: "",
    category: "",
    date: new Date(),
  });

  const filterEvent = new Date();
  const upcomingEvents = events.filter(
    (event) => event.date > filterEvent.toLocaleDateString("en-CA")
  );

  function onchange(e: any) {
    setFilters((prev) => ({ ...prev, searchText: e.target.value }));
  }

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const upcomingEventsList = upcomingEvents.slice(firstIndex, lastIndex);
  const nPageUpcomingEvents = Math.ceil(upcomingEvents.length / recordsPerPage);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isOPen, setIsOpen] = useState(false);

  //filter toggle button
  const toggleCollapse = () => {
    try {
      setIsOpen(!isOPen);
    } catch (error: any) {
      console.error("Error-toggleCollapse:", error);
    }
  };

  //pagination buttons
  function prePage() {
    try {
      if (currentPage !== firstIndex) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error: any) {
      console.error("Error-prePage:", error);
    }
  }
  function nextPage() {
    try {
      if (currentPage !== lastIndex) {
        setCurrentPage(currentPage + 1);
      }
    } catch (error: any) {
      console.error("Error-nextPage:", error);
    }
  }
  function changeCPage(id: number) {
    try {
      setCurrentPage(id);
    } catch (error: any) {
      console.error("Error-changeCPage:", error);
    }
  }

  const filteredItems = useMemo(() => {
    let tempItems = upcomingEventsList; // Assuming 'data' is your original array of items

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
  }, [upcomingEventsList, filters, startDate, endDate]);

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-medium text-secondary">Upcoming Events</h1>
        {upcomingEvents.length === 0 ? (
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
      {isOPen && (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 overflow-hidden">
          <div>
            <input
              className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-1 pr-8 rounded shadow focus:outline-none focus:shadow-outline"
              placeholder="Search by name..."
              value={filters.searchText}
              onChange={onchange}
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

      {upcomingEvents.length === 0 ? (
        <p className="text-center text-2xl">No Upcoming Events</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 *:rounded-sm">
            {filteredItems.map((event) => (
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
