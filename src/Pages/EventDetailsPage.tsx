import { useContext, useState } from "preact/hooks";
import { EventContext } from "../store/EventContext";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, Edit, MapPin, Trash2, X } from "lucide-react";

export default function EventDetailsPage() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("Error");
  }
  const { id } = useParams() as { id: string };
  const { state, deleteEvent } = context;
  const { events } = state;
  const event = state.events.find((event) => event.id === id);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  function handleDeleteEvent() {
    deleteEvent(id);
    navigate("/");
  }
  function handleEventEdit() {
    navigate(`/edit/${id}`);
  }
  return (
    <div className="p-6 flex flex-col gap-6 max-w-3xl">
      <div className="flex flex-col-reverse gap-4">
        <h2 className="text-3xl font-bold text-secondary capitalize">
          {event?.title}
        </h2>
        <div className="self-end space-x-4 *:text-gray-600">
          <button onClick={handleEventEdit}>
            <Edit className="size-5" />
          </button>
          <button onClick={() => setShowDeleteConfirm(true)}>
            <Trash2 className="size-5" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 *:flex *:gap-2 *:text-lg">
        <p>
          <Calendar className="text-secondary" /> {event?.date}
        </p>

        <p>
          <MapPin className="text-secondary" /> {event?.location}
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl text-secondary font-bold">Description</h2>
        <p>{event?.description}</p>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl text-secondary font-bold">Organizer</h2>
        <p>{event?.organizer}</p>
      </div>
      {showDeleteConfirm && (
        <div className="fixed flex items-center justify-center p-4 z-50 inset-0">
          <div className="bg-teal-500 rounded-sm p-6 flex flex-col gap-6">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold text-white">Delete Event</h3>

              <button
                className="text-primary rounded-full p-1 bg-secondary"
                onClick={() => setShowDeleteConfirm(false)}
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="text-white text-lg">
              Are you sure you want to delete this event? <br />
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 *:px-4 *:py-2 *:rounded-sm">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-secondary text-white border"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEvent}
                className="bg-tertiary text-white border"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
