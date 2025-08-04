import { useContext, useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import { EventContext } from "../store/EventContext";

export default function EventCreationPage() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("Error");
  }
  const { addEvent } = context;
  const navigate = useNavigate();
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
  function handleSubmit(e: any) {
    e.preventDefault();
    const eventData = {
      title: formData.title,
      discription: formData.description,
      date: formData.date,
      location: formData.location,
      organizer: formData.organizer,
    };

    const ff = addEvent(eventData);
    console.log(ff);
    navigate("/");
  }
  return (
    <div class="max-w-sm w-full lg:max-w-full lg:flex">
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
            required
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="description"
          >
            Description
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Event Description"
            id="description"
            name="description"
            onChange={handleInputChange}
            value={formData.description}
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
            Date
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Event Date"
            id="date"
            name="date"
            onChange={handleInputChange}
            value={formData.date}
            required
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
            required
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
            required
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create An Event
          </button>

          <button
            class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
