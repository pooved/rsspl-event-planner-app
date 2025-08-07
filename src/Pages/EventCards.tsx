import { Link } from "react-router-dom";
import type { IEvent } from "../types/event";

export default function EventCard({ event }: { event: IEvent }) {
  const { id, title } = event;
  return (
    <Link to={`/event/${id}`}>
      <div>{title}</div>
    </Link>
  );
}
