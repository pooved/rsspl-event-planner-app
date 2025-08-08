import { useContext, useEffect, useState } from "preact/hooks";
import type { IEvent } from "../types/event";
import { EventContext } from "../store/EventContext";
import { useNavigate, useParams } from "react-router-dom";

export default function EventForm({
  isEditing = false,
}: {
  isEditing?: boolean;
}) {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("Error");
  }
  const { state, addEvent, updateEvent } = context;
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organizer: "",
  });
  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  useEffect(() => {
    if (isEditing && id) {
      const eventToEdit = state.events.find((event) => event.id === id);

      if (eventToEdit) {
        setFormData({
          title: eventToEdit.title,
          description: eventToEdit.description,
          date: eventToEdit.date,
          location: eventToEdit.location,
          organizer: eventToEdit.organizer,
        });
      }
    }
  }, [isEditing, id, state.events]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const eventData: Omit<IEvent, "id"> = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      organizer: formData.organizer,
    };
    if (isEditing && id) {
      updateEvent({ id, ...eventData });
    } else {
      addEvent(eventData);
    }

    navigate("/");
  }
  function handleCancel() {
    navigate("/");
  }
  return (
    <div className="rounded-sm p-4  max-w-3xl  ">
      <form
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
            Event Title
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Event Title"
            id="title"
            name="title"
            onChange={handleInputChange}
            value={formData.title}
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="description"
          >
            Description
          </label>
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Event Description"
            id="description"
            name="description"
            onChange={handleInputChange}
            value={formData.description}
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
            Date
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="date"
            placeholder="Event Date"
            id="date"
            name="date"
            onChange={handleInputChange}
            value={formData.date}
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="location"
          >
            Location
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Event Location"
            id="location"
            name="location"
            onChange={handleInputChange}
            value={formData.location}
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="organizer"
          >
            Organizer
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Event Organizer"
            id="organizer"
            name="organizer"
            onChange={handleInputChange}
            value={formData.organizer}
          />
        </div>
        <div class="flex gap-8">
          <button
            class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isEditing ? "Update Event" : "Create Event"}
          </button>

          <button
            class=" font-bold border-secondary bg-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
