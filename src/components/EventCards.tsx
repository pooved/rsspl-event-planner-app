import { Link } from "react-router-dom";
import type { IEvent } from "../types/event";
import BookMark from "../components/BookMark";

export default function EventCard({ event }: { event: IEvent }) {
  const { id, title, description, date, imageUrl } = event;
  const dateString = date;
  const dateObject = new Date(dateString);
  const monthNameShort = dateObject.toLocaleString("en-US", { month: "short" });
  const dayOfMonth = dateObject.toLocaleString("en-US", { day: "2-digit" });
  return (
    <div className="grid grid-rows-[min-content_min-content_1fr] rounded dark:bg-dark dark:text-white overflow-hidden shadow-lg relative duration-200 ">
      <div class="max-h-80 min-h-50 overflow-y-hidden">
        <img
          class="w-full"
          src={imageUrl}
          loading="lazy"
          alt="Sunset in the mountains"
        />
        <div className="absolute top-3 right-3 bg-light text-white  p-2 text-center">
          <p>{monthNameShort}</p>
          <p className="text-2xl">{dayOfMonth}</p>
        </div>
      </div>
      <div class="px-6 py-4">
        <div className="space-y-2">
          <h2 className="text-1xl font-black text-secondary capitalize">
            {title}
          </h2>
          <p className=" line-clamp-2 font-light"> {description}</p>
        </div>
        <div className="py-1 flex justify-between ">
          <Link
            to={`/event/${id}`}
            className="text-teal-500 hover:text-teal-300"
          >
            Read More
          </Link>
          <BookMark event={event} />
        </div>
      </div>
    </div>
  );
}
