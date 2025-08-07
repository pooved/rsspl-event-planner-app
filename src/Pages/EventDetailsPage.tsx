import { useContext, useState } from "preact/hooks";
import { EventContext } from "../store/EventContext";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, Trash2, X } from "lucide-react";

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
  }
  function handleEventEdit() {
    navigate(`/edit/${id}`);
  }
  return (
    <div>
      <h1>Event Details </h1>
      <p>{event?.title}</p>
      <p>{event?.title}</p>
      <button onClick={handleEventEdit}>
        <Edit />
      </button>
      <button onClick={() => setShowDeleteConfirm(true)}>
        <Trash2 />
      </button>
      {showDeleteConfirm && (
        <div>
          <div>
            <div>
              <h3>Delete Event</h3>
              <button onClick={() => setShowDeleteConfirm(false)}>
                <X />
              </button>
            </div>
            <p>Are you want to delete</p>
            <div>
              <button onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button onClick={handleDeleteEvent}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
