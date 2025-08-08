import { Link } from "react-router-dom";
import type { IEvent } from "../types/event";
import { Calendar, MapPin } from "lucide-react";

export default function EventCard({ event }: { event: IEvent }) {
  const { id, title, description, date, location, organizer } = event;
  return (
    <Link
      to={`/event/${id}`}
      className="shadow-sm shadow-secondary hover:shadow-2xl duration-200 p-6 grid grid-rows-[min-content_min-content_1fr] gap-6"
    >
      <div className="space-y-2">
        <h2 className="text-1xl font-medium text-secondary capitalize">
          {title}
        </h2>
        <p className=" line-clamp-3"> {description}</p>
      </div>
      <div className="flex flex-col gap-4 *:flex *:gap-2  *:text-thin">
        <p>
          <Calendar className="text-thin" /> {date}
        </p>

        <p>
          <MapPin className="text-thin" /> {location}
        </p>
        <p>Organizer: {organizer}</p>
      </div>
    </Link>
  );
}
